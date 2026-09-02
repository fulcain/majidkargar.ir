import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from "node:crypto";

// Vault passwords are encrypted at the application layer (AES-256-GCM) before
// they reach MongoDB, so a leaked database dump does not leak credentials.
// The key is derived from VAULT_ENCRYPTION_KEY (falling back to APP_PASSWORD,
// which the admin panel already requires) with SHA-256 so any key length works.
// Rotating the key makes existing encrypted values undecryptable.
const ALGO = "aes-256-gcm";

function keyBuffer(): Buffer {
  const secret = process.env.VAULT_ENCRYPTION_KEY ?? process.env.APP_PASSWORD;
  return createHash("sha256").update(`freebuff-vault:v1:${secret ?? ""}`).digest();
}

export function isVaultEncryptionConfigured(): boolean {
  return Boolean(process.env.VAULT_ENCRYPTION_KEY ?? process.env.APP_PASSWORD);
}

// Short id stored alongside the ciphertext; useful for spotting rows that were
// encrypted with a different key without exposing the key itself.
export function vaultEncryptionKeyId(): string {
  const secret = process.env.VAULT_ENCRYPTION_KEY ?? process.env.APP_PASSWORD;
  if (!secret) return "";
  return createHash("sha256").update(`freebuff-vault:v1:${secret}`).digest("hex").slice(0, 12);
}

export function encryptVaultSecret(plaintext: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv(ALGO, keyBuffer(), iv);
  const encrypted = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);

  return [
    "v1",
    vaultEncryptionKeyId(),
    iv.toString("base64"),
    cipher.getAuthTag().toString("base64"),
    encrypted.toString("base64"),
  ].join(":");
}

export function decryptVaultSecret(payload: string): string {
  const [version, , ivB64, tagB64, dataB64] = payload.split(":");
  if (version !== "v1" || !ivB64 || !tagB64 || !dataB64) {
    throw new Error("Invalid vault payload format.");
  }

  const decipher = createDecipheriv(
    ALGO,
    keyBuffer(),
    Buffer.from(ivB64, "base64"),
  );
  decipher.setAuthTag(Buffer.from(tagB64, "base64"));

  return Buffer.concat([
    decipher.update(Buffer.from(dataB64, "base64")),
    decipher.final(),
  ]).toString("utf8");
}

// Auth-tag failures (wrong key, tampered row) become an empty password instead
// of a 500 — the rest of the entry stays readable.
export function tryDecryptVaultSecret(payload: string | null | undefined): string {
  if (!payload) return "";
  try {
    return decryptVaultSecret(payload);
  } catch {
    return "";
  }
}
