import { getMongoClient } from "./mongodb";
import { tryDecryptVaultSecret } from "./vault-crypto";

export const VAULT_COLLECTION = "vault";

export type VaultEntry = {
  id: string;
  title: string;
  email?: string;
  username?: string;
  password?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
};

type VaultDoc = {
  id: string;
  title: string;
  titleLower?: string;
  email?: string;
  username?: string;
  /** AES-256-GCM sealed value — passwords are never stored in plaintext. */
  encryptedPassword?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
};

// Reads vault entries from MongoDB and decrypts passwords in memory.
// Unlike projects/icons there is no local fallback — the vault only lives in
// the database, and an unreachable database must never fake its contents.
export async function getVaultEntries(): Promise<VaultEntry[]> {
  const client = await getMongoClient();
  if (!client) {
    return [];
  }

  try {
    const docs = await client
      .db()
      .collection<VaultDoc>(VAULT_COLLECTION)
      .find({}, { projection: { _id: 0 } })
      .sort({ titleLower: 1, _id: 1 })
      .toArray();

    return docs.map(({ encryptedPassword, ...rest }) => ({
      ...rest,
      password: tryDecryptVaultSecret(encryptedPassword) || undefined,
    }));
  } catch (error) {
    console.error("Failed to load vault entries from MongoDB.", error);
    return [];
  }
}