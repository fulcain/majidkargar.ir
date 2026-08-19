"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { IconEntry } from "@/src/lib/icons";
import { TechIcon } from "@/src/components/tech-icon";
import { deleteIcon, saveIcon } from "./actions";

type IconsManagerProps = {
  icons: IconEntry[];
};

const inputClass =
  "bg-zinc-900 border border-zinc-700 rounded px-3 py-2 outline-none focus:border-palette-primary";

const emptyIcon = (): IconEntry => ({
  key: "",
  className: "",
  svgLink: "",
  color: "#ffffff",
});

export const IconsManager = ({ icons }: IconsManagerProps) => {
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<IconEntry | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();
  const filteredIcons = normalizedQuery
    ? icons.filter(
        (icon) =>
          icon.key.toLowerCase().includes(normalizedQuery) ||
          (icon.className ?? "").toLowerCase().includes(normalizedQuery) ||
          (icon.svgLink ?? "").toLowerCase().includes(normalizedQuery),
      )
    : icons;

  async function handleDelete(key: string) {
    if (!window.confirm(`Delete icon "${key}"?`)) return;
    setError(null);

    const result = await deleteIcon(key);
    if (result.ok) {
      router.refresh();
    } else {
      setError(result.error ?? "Delete failed.");
    }
  }

  if (adding || editing) {
    return (
      <IconForm
        icon={editing ?? undefined}
        onCancel={() => {
          setAdding(false);
          setEditing(null);
        }}
        onSaved={(ok, err) => {
          if (ok) {
            setAdding(false);
            setEditing(null);
            router.refresh();
          } else {
            setError(err ?? "Save failed.");
          }
        }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {error && <ErrorBanner message={error} onClose={() => setError(null)} />}

      <div className="flex items-center gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search icons…"
          className={`${inputClass} flex-1`}
        />
        <button
          onClick={() => setAdding(true)}
          className="shrink-0 border border-palette-primary rounded px-4 py-2 hover:bg-gray-800 transition"
        >
          + Add icon
        </button>
      </div>

      <p className="text-sm text-zinc-500">
        {filteredIcons.length} of {icons.length} icons
      </p>

      {filteredIcons.length === 0 && (
        <p className="text-sm text-zinc-400">No icons match “{query}”.</p>
      )}

      <ul className="flex flex-col gap-2">
        {filteredIcons.map((icon) => (
          <li
            key={icon.key}
            className="flex items-center justify-between gap-4 border border-zinc-800 rounded px-4 py-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-8 shrink-0 flex justify-center">
                <TechIcon icon={icon} name={icon.key} size={22} />
              </span>
              <div className="min-w-0">
                <p className="font-semibold truncate">{icon.key}</p>
                <p className="text-sm text-zinc-500 truncate">
                  {icon.className || icon.svgLink || "(no icon)"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span
                className="w-6 h-6 rounded border border-zinc-700"
                style={{ backgroundColor: icon.color }}
                title={icon.color}
              />
              <button
                onClick={() => setEditing(icon)}
                className="border border-zinc-700 rounded px-3 py-1 text-sm hover:bg-gray-800 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(icon.key)}
                className="border border-red-900 text-red-400 rounded px-3 py-1 text-sm hover:bg-red-950 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

type IconFormProps = {
  icon?: IconEntry;
  onCancel: () => void;
  onSaved: (ok: boolean, error?: string) => void;
};

const IconForm = ({ icon, onCancel, onSaved }: IconFormProps) => {
  const [form, setForm] = useState<IconEntry>(icon ?? emptyIcon());
  const [busy, setBusy] = useState(false);

  function set<K extends keyof IconEntry>(key: K, value: IconEntry[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.key.trim()) {
      onSaved(false, "Key is required.");
      return;
    }
    if (!form.className?.trim() && !form.svgLink?.trim()) {
      onSaved(false, "Provide a className or an svgLink.");
      return;
    }

    setBusy(true);
    const payload: IconEntry = {
      key: form.key.trim(),
      className: form.className?.trim() || undefined,
      svgLink: form.svgLink?.trim() || undefined,
      color: normalizeColor(form.color),
    };
    const result = await saveIcon(payload, icon?.key);
    setBusy(false);
    onSaved(result.ok, result.error);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">
        {icon ? "Edit icon" : "Add icon"}
      </h2>

      <Field label="Key">
        <input
          value={form.key}
          onChange={(e) => set("key", e.target.value)}
          placeholder="NextJS"
          className={inputClass}
        />
      </Field>

      <Field label="Icon class (devicon)">
        <input
          value={form.className ?? ""}
          onChange={(e) => set("className", e.target.value)}
          placeholder="devicon-nextjs-plain"
          className={inputClass}
        />
      </Field>

      <Field label="SVG path (optional, overrides class)">
        <input
          value={form.svgLink ?? ""}
          onChange={(e) => set("svgLink", e.target.value)}
          placeholder="/icons/radixui.svg"
          className={inputClass}
        />
      </Field>

      <Field label="Color">
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={normalizeColor(form.color)}
            onChange={(e) => set("color", e.target.value)}
            className="h-9 w-12 cursor-pointer bg-transparent"
          />
          <span className="text-sm text-zinc-500">{form.color}</span>
          <TechIcon icon={form} name={form.key || "icon"} size={28} />
        </div>
      </Field>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={busy}
          className="border border-palette-primary rounded px-6 py-2 hover:bg-gray-800 transition disabled:opacity-50"
        >
          {busy ? "Saving…" : "Save icon"}
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
};

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

const ErrorBanner = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => (
  <div className="flex items-center justify-between gap-4 border border-red-900 bg-red-950/40 rounded px-4 py-2 text-sm text-red-300">
    <span>{message}</span>
    <button onClick={onClose} className="text-red-400 hover:text-white">
      ✕
    </button>
  </div>
);

function normalizeColor(color: string): string {
  return /^#[0-9a-fA-F]{6}$/.test(color) ? color : "#ffffff";
}
