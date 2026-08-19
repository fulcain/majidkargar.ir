import dns from "node:dns";

const LOOPBACK_SERVERS = new Set(["127.0.0.1", "::1"]);
const PUBLIC_DNS = ["8.8.8.8", "1.1.1.1"];

// On Windows/Git Bash the generated /etc/resolv.conf points at 127.0.0.1, but
// nothing listens there, so Node's c-ares resolver fails SRV lookups (required
// for mongodb+srv:// URIs) with ECONNREFUSED. Replace empty or loopback-only
// nameserver lists with public resolvers; healthy configs are left untouched.
export function ensureDnsServers() {
  const servers = dns.getServers();

  if (
    servers.length === 0 ||
    servers.every((server) => LOOPBACK_SERVERS.has(server))
  ) {
    dns.setServers(PUBLIC_DNS);
  }
}
