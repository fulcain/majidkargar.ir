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
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin</h1>
          <Link
            href={`/${locale}`}
            className="text-sm text-zinc-400 hover:text-white transition"
          >
            ← Back to site
          </Link>
        </div>

        <div className="flex gap-2">
          <TabButton active={tab === "projects"} onClick={() => setTab("projects")}>
            Projects
          </TabButton>
          <TabButton active={tab === "icons"} onClick={() => setTab("icons")}>
            Icons
          </TabButton>
          <TabButton active={tab === "passwords"} onClick={() => setTab("passwords")}>
            Passwords
          </TabButton>
        </div>

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
                  className="self-start border border-palette-primary rounded px-4 py-2 hover:bg-gray-800 transition"
                >
                  + Add project
                </button>

        <ul className="flex flex-col gap-2">
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
              className={`flex items-center justify-between gap-4 border rounded px-4 py-3 cursor-grab active:cursor-grabbing transition-colors ${
                dragIndex === index
                  ? "opacity-40 border-zinc-700"
                  : overIndex === index && dragIndex !== null
                    ? "border-palette-primary"
                    : "border-zinc-800"
              }`}
            >
              <div className="min-w-0">
                <p className="font-semibold truncate">
                  {project.projectName.en}
                  {project.isPrivate && (
                    <span className="ml-2 text-xs text-zinc-500">private</span>
                  )}
                </p>
                <p className="text-sm text-zinc-500 truncate">
                  /{project.urlPath}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <div className="flex flex-col">
                  <button
                    onClick={() => handleMove(project.urlPath, "up")}
                    disabled={index === 0}
                    className="text-xs text-zinc-500 hover:text-white transition disabled:opacity-30 disabled:hover:text-zinc-500"
                    title="Move up"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => handleMove(project.urlPath, "down")}
                    disabled={index === orderedProjects.length - 1}
                    className="text-xs text-zinc-500 hover:text-white transition disabled:opacity-30 disabled:hover:text-zinc-500"
                    title="Move down"
                  >
                    ↓
                  </button>
                </div>
                <button
                  onClick={() => setEditing(project)}
                  className="border border-zinc-700 rounded px-3 py-1 text-sm hover:bg-gray-800 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.urlPath)}
                  className="border border-red-900 text-red-400 rounded px-3 py-1 text-sm hover:bg-red-950 transition"
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
      </div>
    </div>
  );
};

const TabButton = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`rounded px-4 py-2 text-sm transition ${
      active
        ? "bg-gray-800 text-white"
        : "text-zinc-400 hover:text-white hover:bg-gray-900"
    }`}
  >
    {children}
  </button>
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
