import { projects as fallbackProjects } from "@/src/constants/projects";
import type { ProjectType } from "@/src/constants/projects";
import { getMongoClient } from "./mongodb";

const PROJECTS_COLLECTION = "projects";

// Reads projects from MongoDB. Falls back to the local constants when
// MONGODB_URI is unset (local dev) or the database is unreachable.
export async function getProjects(): Promise<ProjectType[]> {
  const client = await getMongoClient();

  if (!client) {
    return fallbackProjects;
  }

  try {
    const collection = client.db().collection<ProjectType>(PROJECTS_COLLECTION);
    const docs = await collection
      .find({}, { projection: { _id: 0 } })
      .sort({ order: 1, _id: 1 })
      .toArray();

    // An empty collection (e.g. not seeded yet) shouldn't blank the site.
    if (docs.length === 0) {
      return fallbackProjects;
    }

    return docs as ProjectType[];
  } catch (error) {
    console.error(
      "Failed to load projects from MongoDB, falling back to local data.",
      error,
    );
    return fallbackProjects;
  }
}
