"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { ProjectType } from "@/src/constants/projects";
import type { IconEntry } from "@/src/lib/icons";
import type { VaultEntry } from "@/src/lib/vault";
import { deleteProject, moveProject, reorderProjects } from "./actions";
import { ProjectForm } from "./project-form";
import { IconsManager } from "./icons-manager";
import { VaultManager } from "./vault-manager";

type AdminPanelProps = {
  projects: ProjectType[];
  icons: IconEntry[];
  vaultEntries: VaultEntry[];
  locale: string;
};

export const AdminPanel = ({ projects, icons, vaultEntries, locale }: AdminPanelProps) => {
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<ProjectType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const [tab, setTab] = useState<"projects" | "icons" | "passwords">("projects");

  async function handleDelete(urlPath: string) {
    if (!window.confirm(`Delete "${urlPath}"?`)) return;
    setError(null);

    const result = await deleteProject(urlPath);
    if (result.ok) {
      router.refresh();
    } else {
      setError(result.error ?? "Delete failed.");
    }
  }

  async function handleMove(urlPath: string, direction: "up" | "down") {
    setError(null);

    const result = await moveProject(urlPath, direction);
    if (result.ok) {
      router.refresh();
    } else {
      setError(result.error ?? "Move failed.");
    }
  }

  async function handleDrop(e: React.DragEvent, targetIndex: number) {
    if (dragIndex === null || dragIndex === targetIndex) {
      setDragIndex(null);
      setOverIndex(null);
      return;
    }

    // Top half of the target inserts before it, bottom half after it.
    const rect = e.currentTarget.getBoundingClientRect();
    const targetIndexAfter = e.clientY > rect.top + rect.height / 2;
    const targetIndexFinal = targetIndex + (targetIndexAfter ? 1 : 0);

    const reordered = [...orderedProjects];
    const [moved] = reordered.splice(dragIndex, 1);
    const insertAt =
      dragIndex < targetIndexFinal ? targetIndexFinal - 1 : targetIndexFinal;
    reordered.splice(insertAt, 0, moved);

    setError(null);
    const result = await reorderProjects(
      reordered.map((project) => project.urlPath),
    );
    setDragIndex(null);
    setOverIndex(null);

    if (result.ok) {
      router.refresh();
    } else {
      setError(result.error ?? "Reorder failed.");
    }
  }

  function closeForm() {
    setAdding(false);
    setEditing(null);
  }

  // Mirrors the public page: special projects first, then the rest.
  const orderedProjects = [
    ...projects.filter((project) => project.isSpecial),
    ...projects.filter((project) => !project.isSpecial),
  ];

  return (
    <div className="min-h-screen bg-[#08090c] text-zinc-100">
      <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col md:flex-row">
        <aside className="flex w-full shrink-0 flex-col border-b border-white/[0.07] bg-[#0d0e12] p-5 md:min-h-screen md:w-64 md:border-b-0 md:border-r md:p-6">
          <Link href={`/${locale}`} className="mb-9 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] text-lg font-bold text-zinc-200 ring-1 ring-white/10">M</span>
            <span>
              <span className="block text-sm font-semibold tracking-wide">MAJID KARGAR</span>
              <span className="mt-0.5 block text-xs text-zinc-500">Workspace</span>
            </span>
          </Link>

          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600">Manage</p>
          <nav className="flex gap-2 md:flex-col" aria-label="Admin sections">
            <TabButton active={tab === "projects"} onClick={() => setTab("projects")} icon="▦">Projects</TabButton>
            <TabButton active={tab === "icons"} onClick={() => setTab("icons")} icon="◇">Icons</TabButton>
            <TabButton active={tab === "passwords"} onClick={() => setTab("passwords")} icon="▤">Passwords</TabButton>
          </nav>

          <div className="mt-auto hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 md:block">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-zinc-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.55)]" />
              Admin session active
            </div>
            <p className="text-xs leading-relaxed text-zinc-600">Your portfolio content is ready to manage.</p>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-7 sm:px-7 md:px-10 md:py-9">
          <header className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">Control room</p>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{tab === "projects" ? "Projects" : tab === "icons" ? "Icon library" : "Password vault"}</h1>
              <p className="mt-1.5 text-sm text-zinc-500">Manage the content and building blocks behind your portfolio.</p>
            </div>
            <Link href={`/${locale}`} className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white">
              <span aria-hidden="true">↗</span><span className="hidden sm:inline">View site</span>
            </Link>
          </header>

          {tab === "projects" && !adding && !editing && (
            <div className="mb-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <StatCard label="Total projects" value={orderedProjects.length} detail="Across your portfolio" mark="▦" />
              <StatCard label="Featured" value={orderedProjects.filter((project) => project.isSpecial).length} detail="Pinned to the top" mark="✦" />
              <StatCard label="Private" value={orderedProjects.filter((project) => project.isPrivate).length} detail="Hidden from public view" mark="◌" />
            </div>
          )}

        {tab === "icons" && <IconsManager icons={icons} />}

        {tab === "passwords" && <VaultManager entries={vaultEntries} />}

        {tab === "projects" && (
          <>
            {error && (
              <ErrorBanner message={error} onClose={() => setError(null)} />
            )}

            {adding || editing ? (
              <ProjectForm
                project={editing ?? undefined}
                icons={icons}
                onCancel={closeForm}
                onSaved={(ok, err) => {
                  if (ok) {
                    closeForm();
                    router.refresh();
                  } else {
                    setError(err ?? "Save failed.");
                  }
                }}
              />
            ) : (
              <>
                <button
                  onClick={() => setAdding(true)}
                  className="mb-4 inline-flex items-center gap-2 rounded-xl bg-zinc-100 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-white"
                >
                  <span className="text-lg leading-none">+</span> Add project
                </button>

        <ul className="flex flex-col gap-3">
          {/* Public page order: special projects first, then the rest. */}
          {orderedProjects.map((project, index) => (
            <li
              key={project.urlPath}
              draggable
              onDragStart={() => setDragIndex(index)}
              onDragOver={(e) => {
                e.preventDefault();
                setOverIndex(index);
              }}
              onDrop={(e) => {
                e.preventDefault();
                handleDrop(e, index);
              }}
              onDragEnd={() => {
                setDragIndex(null);
                setOverIndex(null);
              }}
              className={`group flex items-center justify-between gap-4 rounded-2xl border bg-[#101116] px-4 py-4 shadow-sm shadow-black/10 cursor-grab active:cursor-grabbing transition-all ${
                dragIndex === index
                  ? "opacity-40 border-zinc-300/30"
                  : overIndex === index && dragIndex !== null
                    ? "border-zinc-300/50"
                    : "border-white/[0.07] hover:border-white/[0.14] hover:bg-[#13141a]"
              }`}
            >
              <div className="flex min-w-0 items-center gap-3.5">
                <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-zinc-600 sm:flex" aria-hidden="true">⠿</span>
                <div className="min-w-0">
                <p className="truncate font-medium text-zinc-100">
                  {project.projectName.en}
                  {project.isPrivate && (
                    <span className="ml-2 rounded-full border border-amber-300/15 bg-amber-300/[0.07] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-200/70">private</span>
                  )}
                  {project.isSpecial && (
                    <span className="ml-2 rounded-full border border-white/10 bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-zinc-300">featured</span>
                  )}
                </p>
                <p className="mt-1 truncate text-xs text-zinc-500">
                  /{project.urlPath}
                </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <div className="hidden flex-col rounded-lg border border-white/[0.06] bg-white/[0.02] sm:flex">
                  <button
                    onClick={() => handleMove(project.urlPath, "up")}
                    disabled={index === 0}
                    className="px-2 text-xs leading-5 text-zinc-500 transition hover:text-white disabled:opacity-30 disabled:hover:text-zinc-500"
                    title="Move up"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => handleMove(project.urlPath, "down")}
                    disabled={index === orderedProjects.length - 1}
                    className="px-2 text-xs leading-5 text-zinc-500 transition hover:text-white disabled:opacity-30 disabled:hover:text-zinc-500"
                    title="Move down"
                  >
                    ↓
                  </button>
                </div>
                <button
                  onClick={() => setEditing(project)}
                  className="rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.urlPath)}
                  className="rounded-lg border border-red-400/15 px-3 py-2 text-xs font-medium text-red-300/80 transition hover:border-red-400/30 hover:bg-red-400/[0.08] hover:text-red-200"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
                </ul>
              </>
            )}
          </>
        )}
        </main>
      </div>
    </div>
  );
};

const TabButton = ({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: string;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`flex flex-1 items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm transition md:flex-none ${
      active
        ? "bg-white/[0.08] font-medium text-white ring-1 ring-white/[0.08]"
        : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-200"
    }`}
  >
    <span className={`text-base ${active ? "text-zinc-200" : "text-zinc-600"}`} aria-hidden="true">{icon}</span>
    {children}
  </button>
);

const StatCard = ({ label, value, detail, mark }: { label: string; value: number; detail: string; mark: string }) => (
  <div className="rounded-2xl border border-white/[0.07] bg-[#101116] p-5">
    <div className="mb-5 flex items-center justify-between">
      <span className="text-sm text-zinc-500">{label}</span>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] text-zinc-300" aria-hidden="true">{mark}</span>
    </div>
    <div className="flex items-end justify-between gap-3">
      <span className="text-3xl font-semibold tracking-tight">{value.toString().padStart(2, "0")}</span>
      <span className="pb-1 text-right text-xs text-zinc-600">{detail}</span>
    </div>
  </div>
);

const ErrorBanner = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => (
  <div className="max-w-3xl mx-auto mb-6 flex items-center justify-between gap-4 border border-red-900 bg-red-950/40 rounded px-4 py-2 text-sm text-red-300">
    <span>{message}</span>
    <button onClick={onClose} className="text-red-400 hover:text-white">
      ✕
    </button>
  </div>
);
