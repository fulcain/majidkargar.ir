"use server";

import { randomUUID } from "node:crypto";
import { VAULT_COLLECTION } from "@/src/lib/vault";
import {
  encryptVaultSecret,
  isVaultEncryptionConfigured,
} from "@/src/lib/vault-crypto";
import { isAdminAuthed } from "@/src/lib/admin-auth";
import { getMongoClient } from "@/src/lib/mongodb";

export type VaultEntryInput = {
  id?: string;
  title: string;
  email?: string;
  username?: string;
  password?: string;
  notes?: string;
};

type ActionResult = { ok: boolean; error?: string };

// Vault actions never fall back to local storage: without a database or an
// encryption secret they must fail loudly instead of silently dropping data.
export async function saveVaultEntry(
  input: VaultEntryInput,
): Promise<ActionResult> {
  if (!(await isAdminAuthed())) {
    return { ok: false, error: "Not authenticated." };
  }

  if (!isVaultEncryptionConfigured()) {
    return {
      ok: false,
      error: "VAULT_ENCRYPTION_KEY (or APP_PASSWORD) is not configured.",
    };
  }

  const title = input.title.trim();
  if (!title) {
    return { ok: false, error: "Title is required." };
  }

  const client = await getMongoClient();
  if (!client) {
    return { ok: false, error: "MONGODB_URI is not configured." };
  }

  const now = new Date().toISOString();
  const fields = {
    title,
    titleLower: title.toLowerCase(),
    email: input.email?.trim() || undefined,
    username: input.username?.trim() || undefined,
    notes: input.notes?.trim() || undefined,
    updatedAt: now,
  };

  try {
    const collection = client.db().collection(VAULT_COLLECTION);

    if (input.id) {
      const existing = await collection.findOne({ id: input.id });
      if (!existing) {
        return { ok: false, error: "Entry not found." };
      }
      // Password is optional on edit: leaving it blank keeps the stored one.
      await collection.updateOne(
        { id: input.id },
        input.password
          ? {
              $set: {
                ...fields,
                encryptedPassword: encryptVaultSecret(input.password),
              },
            }
          : { $set: fields },
      );
    } else {
      await collection.insertOne({
        ...fields,
        id: randomUUID(),
        createdAt: now,
        ...(input.password
          ? { encryptedPassword: encryptVaultSecret(input.password) }
          : {}),
      });
    }

    return { ok: true };
  } catch (error) {
    return { ok: false, error: (error as Error).message };
  }
}

export async function deleteVaultEntry(id: string): Promise<ActionResult> {
  if (!(await isAdminAuthed())) {
    return { ok: false, error: "Not authenticated." };
  }

  const client = await getMongoClient();
  if (!client) {
    return { ok: false, error: "MONGODB_URI is not configured." };
  }

  try {
    await client.db().collection(VAULT_COLLECTION).deleteOne({ id });
    return { ok: true };
  } catch (error) {
    return { ok: false, error: (error as Error).message };
  }
}