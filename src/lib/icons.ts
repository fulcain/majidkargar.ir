import { icons } from "@/src/constants/icons";
import { getMongoClient } from "./mongodb";

const ICONS_COLLECTION = "icons";

export type IconEntry = {
  key: string;
  className?: string;
  svgLink?: string;
  color: string;
};

function fallbackIcons(): IconEntry[] {
  return Object.entries(icons).map(([key, icon]) => ({ key, ...icon }));
}

// Reads icons from MongoDB. Falls back to the local constants when
// MONGODB_URI is unset (local dev) or the database is unreachable.
export async function getIcons(): Promise<IconEntry[]> {
  const client = await getMongoClient();

  if (!client) {
    return fallbackIcons();
  }

  try {
    const collection = client.db().collection<IconEntry>(ICONS_COLLECTION);
    const docs = await collection
      .find({}, { projection: { _id: 0 } })
      .toArray();

    // An empty collection (e.g. not seeded yet) shouldn't leave the picker empty.
    if (docs.length === 0) {
      return fallbackIcons();
    }

    return docs;
  } catch (error) {
    console.error(
      "Failed to load icons from MongoDB, falling back to local data.",
      error,
    );
    return fallbackIcons();
  }
}
