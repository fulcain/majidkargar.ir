"use server";

import { timingSafeEqual } from "node:crypto";
import type { ProjectType } from "@/src/constants/projects";
import type { IconEntry } from "@/src/lib/icons";
import {
  isAdminAuthed,
  isAdminConfigured,
  setAdminSession,
} from "@/src/lib/admin-auth";
import { getMongoClient } from "@/src/lib/mongodb";

const PROJECTS_COLLECTION = "projects";

type ActionResult = { ok: boolean; error?: string };

export async function login(password: string): Promise<ActionResult> {
  if (!isAdminConfigured()) {
    return { ok: false, error: "APP_PASSWORD is not configured on the server." };
  }

  const expected = process.env.APP_PASSWORD as string;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  const match = a.length === b.length && timingSafeEqual(a, b);

  if (!match) {
    return { ok: false, error: "Wrong password." };
  }

  await setAdminSession();
  return { ok: true };
}

export async function saveProject(
  project: ProjectType,
  previousUrlPath?: string,
): Promise<ActionResult> {
  if (!(await isAdminAuthed())) {
    return { ok: false, error: "Not authenticated." };
  }

  const client = await getMongoClient();
  if (!client) {
    return { ok: false, error: "MONGODB_URI is not configured." };
  }

  try {
    const collection = client.db().collection<ProjectType>(PROJECTS_COLLECTION);

    if (previousUrlPath) {
      await collection.updateOne(
        { urlPath: previousUrlPath },
        { $set: project },
      );
    } else {
      const existing = await collection.findOne({ urlPath: project.urlPath });
      if (existing) {
        return {
          ok: false,
          error: `A project with urlPath "${project.urlPath}" already exists.`,
        };
      }
      // New projects go to the end of the list.
      const [last] = await collection
        .find({}, { projection: { order: 1 } })
        .sort({ order: -1 })
        .limit(1)
        .toArray();
      const nextOrder =
        last && typeof last.order === "number" ? last.order + 1 : 0;
      await collection.insertOne({ ...project, order: nextOrder });
    }

    return { ok: true };
  } catch (error) {
    return { ok: false, error: (error as Error).message };
  }
}

export async function moveProject(
  urlPath: string,
  direction: "up" | "down",
): Promise<ActionResult> {
  if (!(await isAdminAuthed())) {
    return { ok: false, error: "Not authenticated." };
  }

  const client = await getMongoClient();
  if (!client) {
    return { ok: false, error: "MONGODB_URI is not configured." };
  }

  try {
    const collection = client.db().collection<ProjectType>(PROJECTS_COLLECTION);
    const docs = await collection
      .find({}, { projection: { _id: 0 } })
      .sort({ order: 1, _id: 1 })
      .toArray();

    // Mirrors the public page: special projects first, then the rest.
    const ordered = [
      ...docs.filter((doc) => doc.isSpecial),
      ...docs.filter((doc) => !doc.isSpecial),
    ];
    const index = ordered.findIndex((doc) => doc.urlPath === urlPath);
    if (index < 0) {
      return { ok: false, error: "Project not found." };
    }

    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= ordered.length) {
      return { ok: true }; // already at the edge
    }

    [ordered[index], ordered[swapIndex]] = [ordered[swapIndex], ordered[index]];

    await collection.bulkWrite(
      ordered.map((doc, i) => ({
        updateOne: {
          filter: { urlPath: doc.urlPath },
          update: { $set: { order: i } },
        },
      })),
    );

    return { ok: true };
  } catch (error) {
    return { ok: false, error: (error as Error).message };
  }
}

export async function reorderProjects(
  urlPaths: string[],
): Promise<ActionResult> {
  if (!(await isAdminAuthed())) {
    return { ok: false, error: "Not authenticated." };
  }

  const client = await getMongoClient();
  if (!client) {
    return { ok: false, error: "MONGODB_URI is not configured." };
  }

  try {
    const collection = client.db().collection<ProjectType>(PROJECTS_COLLECTION);
    const docs = await collection
      .find({}, { projection: { _id: 0, urlPath: 1 } })
      .toArray();

    const existing = new Set(docs.map((doc) => doc.urlPath));
    if (
      urlPaths.length !== existing.size ||
      urlPaths.some((urlPath) => !existing.has(urlPath))
    ) {
      return { ok: false, error: "Invalid order list." };
    }

    await collection.bulkWrite(
      urlPaths.map((urlPath, index) => ({
        updateOne: {
          filter: { urlPath },
          update: { $set: { order: index } },
        },
      })),
    );

    return { ok: true };
  } catch (error) {
    return { ok: false, error: (error as Error).message };
  }
}

export async function saveIcon(
  icon: IconEntry,
  previousKey?: string,
): Promise<ActionResult> {
  if (!(await isAdminAuthed())) {
    return { ok: false, error: "Not authenticated." };
  }

  const client = await getMongoClient();
  if (!client) {
    return { ok: false, error: "MONGODB_URI is not configured." };
  }

  try {
    const collection = client.db().collection<IconEntry>("icons");

    if (previousKey) {
      await collection.updateOne({ key: previousKey }, { $set: icon });
    } else {
      const existing = await collection.findOne({ key: icon.key });
      if (existing) {
        return {
          ok: false,
          error: `An icon with key "${icon.key}" already exists.`,
        };
      }
      await collection.insertOne(icon);
    }

    return { ok: true };
  } catch (error) {
    return { ok: false, error: (error as Error).message };
  }
}

export async function deleteIcon(key: string): Promise<ActionResult> {
  if (!(await isAdminAuthed())) {
    return { ok: false, error: "Not authenticated." };
  }

  const client = await getMongoClient();
  if (!client) {
    return { ok: false, error: "MONGODB_URI is not configured." };
  }

  try {
    await client.db().collection("icons").deleteOne({ key });
    return { ok: true };
  } catch (error) {
    return { ok: false, error: (error as Error).message };
  }
}

export async function deleteProject(urlPath: string): Promise<ActionResult> {
  if (!(await isAdminAuthed())) {
    return { ok: false, error: "Not authenticated." };
  }

  const client = await getMongoClient();
  if (!client) {
    return { ok: false, error: "MONGODB_URI is not configured." };
  }

  try {
    await client.db().collection(PROJECTS_COLLECTION).deleteOne({ urlPath });
    return { ok: true };
  } catch (error) {
    return { ok: false, error: (error as Error).message };
  }
}
