import type { Metadata } from "next";
import { getProjects } from "@/src/lib/projects";
import { getIcons } from "@/src/lib/icons";
import { getVaultEntries } from "@/src/lib/vault";
import { isAdminAuthed, isAdminConfigured } from "@/src/lib/admin-auth";
import { LoginForm } from "./login-form";
import { AdminPanel } from "./admin-panel";

// Cookie-based guard must run on every request, never at build time.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isAdminConfigured()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-zinc-300 p-6">
        <p>
          Admin is not configured. Set <code className="text-white">APP_PASSWORD</code>{" "}
          in the environment variables.
        </p>
      </div>
    );
  }

  if (!(await isAdminAuthed())) {
    return <LoginForm locale={locale} />;
  }

  const [projects, icons, vaultEntries] = await Promise.all([
    getProjects(),
    getIcons(),
    getVaultEntries(),
  ]);

  return (
    <AdminPanel
      projects={projects}
      icons={icons}
      vaultEntries={vaultEntries}
      locale={locale}
    />
  );
}
