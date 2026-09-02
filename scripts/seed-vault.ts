import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { getMongoClient } from "../src/lib/mongodb";
import {
  encryptVaultSecret,
  isVaultEncryptionConfigured,
} from "../src/lib/vault-crypto";

type SeedVaultEntry = {
  title: string;
  email?: string;
  username?: string;
  password?: string;
  notes?: string;
};

if (!process.env.MONGODB_URI) {
  console.error(
    "MONGODB_URI is not set. Add it to .env (copy it from Vercel -> Settings -> Environment Variables).",
  );
  process.exit(1);
}

if (!isVaultEncryptionConfigured()) {
  console.error(
    "VAULT_ENCRYPTION_KEY (or APP_PASSWORD) is not set — vault entries are encrypted before being stored.",
  );
  process.exit(1);
}

const SEED_FILE = "data/vault-seed.json";

function loadEntries(): SeedVaultEntry[] {
  try {
    return JSON.parse(readFileSync(SEED_FILE, "utf8")) as SeedVaultEntry[];
  } catch (error) {
    console.error(`Could not read ${SEED_FILE}:`, error);
    console.error(
      `Create ${SEED_FILE} with the entries to import (it is git-ignored so plaintext passwords never reach the repo).`,
    );
    process.exit(1);
  }
}

// Keeps same titles unique by appending a counter, mirroring how a single
// "Gmail:" block with two accounts should become two rows.
function registerTitle(title: string, seen: Map<string, number>): string {
  const count = seen.get(title) ?? 0;
  seen.set(title, count + 1);
  return count === 0 ? title : `${title} (${count + 1})`;
}

async function main() {
  const entries = loadEntries();
  const client = await getMongoClient();

  if (!client) {
    console.error("MONGODB_URI is not configured.");
    process.exit(1);
  }

  try {
    const collection = client.db().collection("vault");
    // Upsert by title so re-running the seed updates instead of duplicating.
    const now = new Date().toISOString();
    const seen = new Map<string, number>();
    let upserted = 0;

    for (const entry of entries) {
      const title = registerTitle(entry.title.trim(), seen);
      const doc = {
        id: randomUUID(),
        title,
        titleLower: title.toLowerCase(),
        email: entry.email?.trim() || undefined,
        username: entry.username?.trim() || undefined,
        encryptedPassword: entry.password
          ? encryptVaultSecret(entry.password)
          : undefined,
        notes: entry.notes?.trim() || undefined,
        createdAt: now,
        updatedAt: now,
      };

      await collection.updateOne(
        { title },
        { $set: doc },
        { upsert: true },
      );
      upserted += 1;
    }

    console.log(`Upserted ${upserted} vault entr${upserted === 1 ? "y" : "ies"} into MongoDB.`);
    console.log(
      `Sample: "${entries[0]?.title}" — password encrypted on the way in.`,
    );
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});