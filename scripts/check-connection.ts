import { getMongoClient } from "../src/lib/mongodb";

// Hard kill timer so a hanging connection can't block forever.
setTimeout(() => {
  console.error("HARD TIMEOUT: connection still hanging after 25s.");
  process.exit(2);
}, 25000).unref();

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("MONGODB_URI is not set.");
  process.exit(1);
}

console.log("URI:", uri.replace(/:\/\/[^@/]+@/, "://<credentials>@"));

async function main() {
  const client = await getMongoClient();

  if (!client) {
    console.error("MONGODB_URI is not configured.");
    process.exit(1);
  }

  try {
    console.log("Connecting...");
    await client.connect();
    console.log("Connected. DB name:", client.db().databaseName);

    const collections = await client.db().listCollections().toArray();
    console.log(
      "Collections:",
      collections.map((c) => c.name).join(", ") || "(none)",
    );

    const count = await client.db().collection("projects").countDocuments();
    console.log("projects documents:", count);

    const iconCount = await client.db().collection("icons").countDocuments();
    console.log("icons documents:", iconCount);

    if (count > 0) {
      const docs = await client
        .db()
        .collection("projects")
        .find(
          {},
          { projection: { _id: 0, "projectName.en": 1, urlPath: 1 } },
        )
        .toArray();
      console.log("First 5:", JSON.stringify(docs.slice(0, 5)));
    }
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error("FAILED:", (error as Error).message);
  process.exit(1);
});
