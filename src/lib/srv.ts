import dns from "node:dns";
import { createSocket } from "node:dgram";
import { randomBytes } from "node:crypto";

const RESOLVERS = ["8.8.8.8", "1.1.1.1"];
const QUERY_TIMEOUT_MS = 5000;

export const TYPE_SRV = 33;
export const TYPE_TXT = 16;

type SrvRecord = { name: string; port: number };

// Resolves a mongodb+srv:// URI to a plain mongodb:// URI. Uses Node's c-ares
// resolver when it works; on Windows/Git Bash c-ares can be broken (queries get
// ECONNREFUSED even though lookup() and raw UDP work), so we fall back to
// minimal SRV/TXT queries over raw UDP against public resolvers.
export async function resolveSrvUri(srvUri: string): Promise<string> {
  const match = srvUri.match(/^mongodb\+srv:\/\/([^/]+)(\/[^?]*)?(\?.*)?$/);
  if (!match) {
    throw new Error("Invalid mongodb+srv:// URI");
  }

  const [, hostAndAuth, pathPart, queryPart] = match;
  const at = hostAndAuth.lastIndexOf("@");
  const userinfo = at >= 0 ? hostAndAuth.slice(0, at + 1) : "";
  const host = (at >= 0 ? hostAndAuth.slice(at + 1) : hostAndAuth).split(":")[0];

  const [records, txtRecords] = await lookupRecords(host);

  const params = new URLSearchParams(queryPart ?? "");
  for (const entry of txtRecords) {
    for (const pair of entry.split("&")) {
      const eq = pair.indexOf("=");
      const key = eq >= 0 ? pair.slice(0, eq) : pair;
      const value = eq >= 0 ? pair.slice(eq + 1) : "";
      if (!params.has(key)) params.set(key, value);
    }
  }
  if (!params.has("tls")) params.set("tls", "true");

  const hosts = records.map((r) => `${r.name}:${r.port}`).join(",");
  const query = params.toString();

  return `mongodb://${userinfo}${hosts}${pathPart ?? ""}?${query}`;
}

function isValidHostname(name: string): boolean {
  return /^[a-zA-Z0-9.-]+$/.test(name) && !name.includes("..");
}

async function lookupRecords(
  hostname: string,
): Promise<[SrvRecord[], string[]]> {
  try {
    const records = await dns.promises.resolve(hostname, "SRV");
    if (!records.every((r) => isValidHostname(r.name) && r.port > 0)) {
      throw new Error("c-ares returned malformed SRV records");
    }
    const txt = (await dns.promises.resolveTxt(hostname)).flat();
    return [
      records.map((r) => ({ name: r.name, port: r.port })),
      txt,
    ];
  } catch {
    // c-ares path failed or returned garbage (broken environment) — retry over raw UDP.
  }

  const srvMessage = await queryDns(`_mongodb._tcp.${hostname}`, TYPE_SRV);
  const records = parseSrv(srvMessage);

  const txtMessage = await queryDns(hostname, TYPE_TXT);
  const txtRecords = parseTxt(txtMessage);

  return [records, txtRecords];
}

function encodeName(name: string): Buffer {
  const parts = name.split(".");
  const chunks = parts.map((part) => {
    const bytes = Buffer.from(part, "utf8");
    const chunk = Buffer.alloc(1 + bytes.length);
    chunk[0] = bytes.length;
    bytes.copy(chunk, 1);
    return chunk;
  });
  return Buffer.concat([...chunks, Buffer.from([0])]);
}

function encodeQuery(id: number, name: string, type: number): Buffer {
  const header = Buffer.alloc(12);
  header.writeUInt16BE(id, 0);
  header.writeUInt16BE(0x0100, 2); // RD flag
  header.writeUInt16BE(1, 4); // one question

  const question = Buffer.alloc(4);
  question.writeUInt16BE(type, 0);
  question.writeUInt16BE(1, 2); // class IN

  return Buffer.concat([header, encodeName(name), question]);
}

function decodeName(
  message: Buffer,
  offset: number,
): { name: string; next: number } {
  const parts: string[] = [];
  let pos = offset;
  let next = -1;
  let hops = 0;

  while (hops++ < 64) {
    const len = message[pos];

    if (len === 0) {
      pos += 1;
      if (next < 0) next = pos;
      break;
    }

    if ((len & 0xc0) === 0xc0) {
      const pointer = ((len & 0x3f) << 8) | message[pos + 1];
      if (next < 0) next = pos + 2;
      pos = pointer;
      continue;
    }

    parts.push(message.subarray(pos + 1, pos + 1 + len).toString("utf8"));
    pos += 1 + len;
  }

  return { name: parts.join("."), next };
}

function parseAnswers<T>(
  message: Buffer,
  kind: "srv" | "txt",
): T[] {
  const answerCount = message.readUInt16BE(6);
  const results: T[] = [];
  let pos = 12;

  // Skip the question section (one question).
  pos = decodeName(message, pos).next + 4;

  for (let i = 0; i < answerCount; i++) {
    pos = decodeName(message, pos).next;
    const type = message.readUInt16BE(pos);
    const rdlength = message.readUInt16BE(pos + 8);
    const rdata = pos + 10;

    if (kind === "srv" && type === TYPE_SRV) {
      // SRV rdata: priority(2) + weight(2) + port(2) + target
      const port = message.readUInt16BE(rdata + 4);
      const target = decodeName(message, rdata + 6);
      results.push({ name: target.name, port } as T);
    } else if (kind === "txt" && type === TYPE_TXT) {
      let p = rdata;
      const end = rdata + rdlength;
      while (p < end) {
        const len = message[p];
        results.push(message.subarray(p + 1, p + 1 + len).toString("utf8") as T);
        p += 1 + len;
      }
    }

    pos = rdata + rdlength;
  }

  return results;
}

export function parseSrv(message: Buffer): SrvRecord[] {
  return parseAnswers<SrvRecord>(message, "srv");
}

export function parseTxt(message: Buffer): string[] {
  return parseAnswers<string>(message, "txt");
}

export function queryDns(name: string, type: number): Promise<Buffer> {
  const id = randomBytes(2).readUInt16BE(0);
  const query = encodeQuery(id, name, type);

  return queryWithRetries(id, query, name);
}

async function queryWithRetries(
  id: number,
  query: Buffer,
  name: string,
): Promise<Buffer> {
  let lastError: Error | null = null;

  for (const server of RESOLVERS) {
    try {
      return await queryServer(id, query, server);
    } catch (error) {
      lastError = error as Error;
    }
  }

  throw lastError ?? new Error(`DNS query failed for ${name}`);
}

function queryServer(id: number, query: Buffer, server: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const socket = createSocket("udp4");
    const timer = setTimeout(() => {
      socket.close();
      reject(new Error(`DNS query timed out (${server})`));
    }, QUERY_TIMEOUT_MS);

    socket.on("message", (message) => {
      if (message.readUInt16BE(0) !== id) return; // stale response

      clearTimeout(timer);
      socket.close();

      const rcode = message.readUInt16BE(2) & 0xf;
      if (rcode !== 0) {
        reject(new Error(`DNS rcode ${rcode} for query (${server})`));
        return;
      }
      resolve(message);
    });

    socket.on("error", (error) => {
      clearTimeout(timer);
      socket.close();
      reject(error);
    });

    socket.send(query, 53, server);
  });
}
