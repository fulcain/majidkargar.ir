"use client";

import { useState } from "react";
import type { ProjectType, TechnologiesType } from "@/src/constants/projects";
import type { IconEntry } from "@/src/lib/icons";
import { TechIcon } from "@/src/components/tech-icon";
import { saveProject } from "./actions";

type ProjectFormProps = {
  project?: ProjectType;
  icons: IconEntry[];
  onCancel: () => void;
  onSaved: (ok: boolean, error?: string) => void;
};

const emptyProject = (): ProjectType => ({
  projectName: { en: "", fa: "" },
  description: { en: "", fa: "" },
  urlPath: "",
  liveLink: "",
  repoLink: "",
  isSpecial: false,
  isPrivate: false,
  hasLiveLink: true,
  projectType: "personal",
  technologies: [],
});

const inputClass =
  "bg-zinc-900 border border-zinc-700 rounded px-3 py-2 outline-none focus:border-palette-primary";

export const ProjectForm = ({
  project,
  icons,
  onCancel,
  onSaved,
}: ProjectFormProps) => {
  const [form, setForm] = useState<ProjectType>(project ?? emptyProject());
  const [busy, setBusy] = useState(false);

  function set<K extends keyof ProjectType>(key: K, value: ProjectType[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.urlPath.trim()) {
      onSaved(false, "urlPath is required.");
      return;
    }
    if (!form.projectName.en.trim()) {
      onSaved(false, "English project name is required.");
      return;
    }

    setBusy(true);
    const result = await saveProject(
      {
        ...form,
        // Rows left on the placeholder dropdown have no icon.
        technologies: form.technologies.filter(
          (tech) => tech.name.trim() !== "",
        ),
      },
      project?.urlPath,
    );
    setBusy(false);
    onSaved(result.ok, result.error);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto flex flex-col gap-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {project ? "Edit project" : "Add project"}
        </h1>
        <button
          type="button"
          onClick={onCancel}
          className="text-sm text-zinc-400 hover:text-white transition"
        >
          ← Back
        </button>
      </div>

      <Section title="Names">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Name (EN)">
            <input
              value={form.projectName.en}
              onChange={(e) =>
                set("projectName", { ...form.projectName, en: e.target.value })
              }
              placeholder="Menu Saz"
              className={inputClass}
            />
          </Field>
          <Field label="Name (FA)">
            <input
              value={form.projectName.fa}
              onChange={(e) =>
                set("projectName", { ...form.projectName, fa: e.target.value })
              }
              placeholder="منوساز"
              dir="rtl"
              className={inputClass}
            />
          </Field>
        </div>
      </Section>

      <Section title="Descriptions">
        <div className="flex flex-col gap-4">
          <Field label="Description (EN)">
            <textarea
              rows={5}
              value={form.description.en}
              onChange={(e) =>
                set("description", {
                  ...form.description,
                  en: e.target.value,
                })
              }
              placeholder="What does this project do?"
              className={inputClass}
            />
          </Field>
          <Field label="Description (FA)">
            <textarea
              rows={5}
              value={form.description.fa}
              onChange={(e) =>
                set("description", {
                  ...form.description,
                  fa: e.target.value,
                })
              }
              placeholder="توضیح فارسی"
              dir="rtl"
              className={inputClass}
            />
          </Field>
        </div>
      </Section>

      <Section title="Links & route">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="urlPath">
            <input
              value={form.urlPath}
              onChange={(e) => set("urlPath", e.target.value)}
              placeholder="menu-saz"
              className={inputClass}
            />
          </Field>
          <Field label="Live link">
            <input
              value={form.liveLink ?? ""}
              onChange={(e) => set("liveLink", e.target.value)}
              placeholder="https://…"
              className={inputClass}
            />
          </Field>
          <Field label="Repo link">
            <input
              value={form.repoLink ?? ""}
              onChange={(e) => set("repoLink", e.target.value)}
              placeholder="https://github.com/…"
              className={inputClass}
            />
          </Field>
        </div>
      </Section>

      <Section title="Options">
        <div className="flex flex-wrap items-center gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isSpecial}
              onChange={(e) => set("isSpecial", e.target.checked)}
            />
            Special
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isPrivate}
              onChange={(e) => set("isPrivate", e.target.checked)}
            />
            Private
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.hasLiveLink}
              onChange={(e) => set("hasLiveLink", e.target.checked)}
            />
            Has live link
          </label>
          <label className="flex items-center gap-2">
            Type
            <select
              value={form.projectType}
              onChange={(e) =>
                set("projectType", e.target.value as "work" | "personal")
              }
              className={inputClass}
            >
              <option value="work">work</option>
              <option value="personal">personal</option>
            </select>
          </label>
        </div>
      </Section>

      <Section title="Technologies">
        <div className="flex flex-col gap-3">
          {form.technologies.map((tech, idx) => (
            <div
              key={idx}
              className="flex flex-wrap items-center gap-2 border border-zinc-800 rounded p-3"
            >
              <IconPicker
                value={iconKeyFor(tech, icons)}
                icons={icons}
                onSelect={(key) => {
                  const entry = icons.find((item) => item.key === key);
                  if (entry) {
                    updateTech(idx, {
                      name: entry.key,
                      icon: {
                        className: entry.className,
                        svgLink: entry.svgLink,
                        color: entry.color,
                      },
                    });
                  }
                }}
              />

              <button
                type="button"
                onClick={() =>
                  set(
                    "technologies",
                    form.technologies.filter((_, i) => i !== idx),
                  )
                }
                className="text-sm text-red-400 hover:text-red-300 transition px-2"
                title="Remove technology"
              >
                ✕
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              set("technologies", [
                ...form.technologies,
                { name: "", icon: { color: "#ffffff" } },
              ])
            }
            className="self-start text-sm border border-dashed border-zinc-700 rounded px-4 py-2 text-zinc-400 hover:border-zinc-400 hover:text-white transition"
          >
            + Add technology
          </button>
        </div>
      </Section>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={busy}
          className="border border-palette-primary rounded px-6 py-2 hover:bg-gray-800 transition disabled:opacity-50"
        >
          {busy ? "Saving…" : "Save project"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border border-zinc-700 rounded px-6 py-2 hover:bg-gray-800 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );

  function updateTech(
    idx: number,
    patch: Partial<TechnologiesType[number]>,
  ) {
    set(
      "technologies",
      form.technologies.map((tech, i) => (i === idx ? { ...tech, ...patch } : tech)),
    );
  }
};

function iconKeyFor(
  tech: TechnologiesType[number],
  icons: IconEntry[],
): string {
  const { className, svgLink } = tech.icon;
  const entry = icons.find(
    (item) =>
      (className && item.className === className) ||
      (svgLink && item.svgLink === svgLink),
  );
  return entry?.key ?? "";
}

const IconPicker = ({
  value,
  icons,
  onSelect,
}: {
  value: string;
  icons: IconEntry[];
  onSelect: (key: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const selected = icons.find((item) => item.key === value);
  const q = query.trim().toLowerCase();
  const filtered = icons.filter(
    (item) =>
      !q ||
      item.key.toLowerCase().includes(q) ||
      (item.className ?? "").toLowerCase().includes(q) ||
      (item.svgLink ?? "").toLowerCase().includes(q),
  );

  return (
    <div className="relative flex-1 min-w-[180px]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`${inputClass} w-full flex items-center gap-2 text-left`}
        title="Icon from database"
      >
        {selected ? (
          <>
            <TechIcon
              icon={{ className: selected.className, svgLink: selected.svgLink }}
              name={selected.key}
              size={18}
            />
            <span>{selected.key}</span>
          </>
        ) : (
          <span className="text-zinc-500">Choose icon…</span>
        )}
        <span className="ml-auto text-xs text-zinc-500">▾</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute z-20 top-full left-0 right-0 mt-1 border border-zinc-700 rounded bg-zinc-900 shadow-xl overflow-hidden">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search icons…"
              className="w-full bg-zinc-800 border-b border-zinc-700 px-3 py-2 outline-none text-sm"
            />
            <ul className="max-h-60 overflow-y-auto">
              {filtered.map((icon) => (
                <li key={icon.key}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelect(icon.key);
                      setOpen(false);
                      setQuery("");
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-zinc-800 transition"
                  >
                    <TechIcon
                      icon={{ className: icon.className, svgLink: icon.svgLink }}
                      name={icon.key}
                      size={18}
                    />
                    <span>{icon.key}</span>
                  </button>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="px-3 py-2 text-sm text-zinc-500">
                  No icons match
                </li>
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="flex flex-col gap-3">
    <h2 className="text-lg font-semibold text-zinc-300">{title}</h2>
    {children}
  </section>
);

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <label className="flex flex-col gap-1.5 text-sm text-zinc-400">
    {label}
    {children}
  </label>
);


