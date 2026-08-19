import { MongoClient } from "mongodb";
import { ensureDnsServers } from "./dns";
import { resolveSrvUri } from "./srv";

const uri = process.env.MONGODB_URI;

const globalWithMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

// Reuse the client across hot reloads in dev and across serverless invocations.
// mongodb+srv:// URIs are resolved once per process (see srv.ts for the
// fallback used when the environment's DNS resolver is broken).
export async function getMongoClient(): Promise<MongoClient | null> {
  if (!uri) {
    return null;
  }

  if (!globalWithMongo._mongoClientPromise) {
    ensureDnsServers();
    const effectiveUri = uri.startsWith("mongodb+srv://")
      ? await resolveSrvUri(uri)
      : uri;
    globalWithMongo._mongoClientPromise = Promise.resolve(
      new MongoClient(effectiveUri),
    );
  }

  return globalWithMongo._mongoClientPromise;
}
