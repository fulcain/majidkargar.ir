import { projects } from "../src/constants/projects";
import { icons } from "../src/constants/icons";
import { getMongoClient } from "../src/lib/mongodb";

if (!process.env.MONGODB_URI) {
  console.error(
    "MONGODB_URI is not set. Add it to .env (copy it from Vercel -> Settings -> Environment Variables).",
  );
  process.exit(1);
}

async function main() {
  const client = await getMongoClient();

  if (!client) {
    console.error("MONGODB_URI is not configured.");
    process.exit(1);
  }

  try {
    const projectsCollection = client.db().collection("projects");

    const { deletedCount } = await projectsCollection.deleteMany({});
    console.log(`Removed ${deletedCount} existing project(s).`);

    const orderedProjects = projects.map((project, index) => ({
      ...project,
      order: index,
    }));
    const { insertedCount } = await projectsCollection.insertMany(
      orderedProjects,
    );
    console.log(`Inserted ${insertedCount} project(s) into MongoDB.`);

    const iconDocs = Object.entries(icons).map(([key, icon]) => ({
      key,
      ...icon,
    }));
    const iconsCollection = client.db().collection("icons");
    const { deletedCount: iconsDeleted } = await iconsCollection.deleteMany({});
    console.log(`Removed ${iconsDeleted} existing icon(s).`);
    const { insertedCount: iconsInserted } =
      await iconsCollection.insertMany(iconDocs);
    console.log(`Inserted ${iconsInserted} icon(s) into MongoDB.`);

    const { urlPath, projectName } = projects[0];
    console.log(`Sample project: ${projectName.en} (${urlPath})`);
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
