"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { VaultEntry } from "@/src/lib/vault";
import { deleteVaultEntry, saveVaultEntry } from "./vault-actions";
import type { VaultEntryInput } from "./vault-actions";

type VaultManagerProps = {
  entries: VaultEntry[];
};

const inputClass =
  "bg-zinc-900 border border-zinc-700 rounded px-3 py-2 outline-none focus:border-palette-primary";

const emptyForm = (): VaultEntryInput => ({
  title: "",
  email: "",
  username: "",
  password: "",
  notes: "",
});

export const VaultManager = ({ entries }: VaultManagerProps) => {
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<VaultEntry | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const filteredEntries = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter((entry) =>
      [entry.title, entry.email, entry.username, entry.password, entry.notes].some(
        (value) => value?.toLowerCase().includes(q),
      ),
    );
  }, [entries, query]);

  async function handleDelete(id: string, title: string) {
    if (!window.confirm(`Delete "${title}"?`)) return;
    setError(null);

    const result = await deleteVaultEntry(id);
    if (result.ok) {
      router.refresh();
    } else {
      setError(result.error ?? "Delete failed.");
    }
  }

  async function copyToClipboard(value: string, key: string) {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return;
    }
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1200);
  }

  if (adding || editing) {
    return (
      <VaultForm
        entry={editing ?? undefined}
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
      <p className="text-xs text-zinc-600">
        Stored encrypted (AES-256-GCM) in MongoDB. Only you can decrypt these.
      </p>

      {error && <ErrorBanner message={error} onClose={() => setError(null)} />}

      <div className="flex items-center gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search passwords…"
          className={`${inputClass} flex-1`}
          spellCheck={false}
        />
        <button
          onClick={() => setAdding(true)}
          className="shrink-0 border border-palette-primary rounded px-4 py-2 hover:bg-gray-800 transition"
        >
          + Add password
        </button>
      </div>

      <p className="text-sm text-zinc-500">
        {filteredEntries.length} of {entries.length} passwords
      </p>

      {filteredEntries.length === 0 && (
        <p className="text-sm text-zinc-400">
          {query ? `No passwords match “${query}”.` : "No passwords yet."}
        </p>
      )}

      <ul className="flex flex-col gap-2">
        {filteredEntries.map((entry) => {
          const showPassword = Boolean(revealed[entry.id] && entry.password);
          const hasPassword = Boolean(entry.password);
          return (
            <li
              key={entry.id}
              className="border border-zinc-800 rounded px-4 py-3 flex flex-col gap-2"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold truncate">{entry.title}</p>
                  {entry.email && (
                    <p className="text-sm text-zinc-400 truncate">
                      {entry.email}
                    </p>
                  )}
                  {entry.username && (
                    <p className="text-sm text-zinc-500 truncate">
                      {entry.username}
                    </p>
                  )}
                  {hasPassword && (
                    <p
                      className={`text-sm truncate ${
                        showPassword ? "font-mono" : "tracking-widest"
                      }`}
                      title={entry.password}
                    >
                      {showPassword ? entry.password : "••••••••••"}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {hasPassword && (
                    <>
                      <button
                        onClick={() =>
                          setRevealed((prev) => ({
                            ...prev,
                            [entry.id]: !prev[entry.id],
                          }))
                        }
                        className="border border-zinc-700 rounded px-3 py-1 text-sm hover:bg-gray-800 transition"
                        title={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                      {showPassword && (
                        <button
                          onClick={() =>
                            copyToClipboard(entry.password!, entry.id)
                          }
                          className="border border-zinc-700 rounded px-3 py-1 text-sm hover:bg-gray-800 transition"
                        >
                          {copiedKey === entry.id ? "Copied!" : "Copy"}
                        </button>
                      )}
                    </>
                  )}
                  <button
                    onClick={() => setEditing(entry)}
                    className="border border-zinc-700 rounded px-3 py-1 text-sm hover:bg-gray-800 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(entry.id, entry.title)}
                    className="border border-red-900 text-red-400 rounded px-3 py-1 text-sm hover:bg-red-950 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {entry.notes && (
                <p className="text-xs text-zinc-500 whitespace-pre-wrap break-words border-t border-zinc-800/60 pt-2">
                  {entry.notes}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

type VaultFormProps = {
  entry?: VaultEntry;
  onCancel: () => void;
  onSaved: (ok: boolean, error?: string) => void;
};

const VaultForm = ({ entry, onCancel, onSaved }: VaultFormProps) => {
  const [form, setForm] = useState<VaultEntryInput>(
    entry
      ? {
          id: entry.id,
          title: entry.title,
          email: entry.email ?? "",
          username: entry.username ?? "",
          password: entry.password ?? "",
          notes: entry.notes ?? "",
        }
      : emptyForm(),
  );
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function setField<K extends keyof VaultEntryInput>(
    key: K,
    value: VaultEntryInput[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.title.trim()) {
      onSaved(false, "Title is required.");
      return;
    }

    setBusy(true);
    const result = await saveVaultEntry(form);
    setBusy(false);
    onSaved(result.ok, result.error);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">
        {entry ? "Edit password" : "Add password"}
      </h2>

      <Field label="Title">
        <input
          value={form.title}
          onChange={(e) => setField("title", e.target.value)}
          placeholder="Steam"
          className={inputClass}
        />
      </Field>

      <Field label="Email / Gmail (optional)">
        <input
          type="email"
          value={form.email ?? ""}
          onChange={(e) => setField("email", e.target.value)}
          placeholder="me@example.com"
          className={inputClass}
        />
      </Field>

      <Field label="Username (optional)">
        <input
          value={form.username ?? ""}
          onChange={(e) => setField("username", e.target.value)}
          placeholder="cool_bmk1"
          className={inputClass}
        />
      </Field>

      <Field label="Password (optional)">
        <div className="flex gap-2">
          <input
            type={showPassword ? "text" : "password"}
            value={form.password ?? ""}
            onChange={(e) => setField("password", e.target.value)}
            placeholder="••••••••"
            className={`${inputClass} flex-1 font-mono`}
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="shrink-0 border border-zinc-700 rounded px-3 text-sm hover:bg-gray-800 transition"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </Field>

      <Field label="Notes">
        <textarea
          value={form.notes ?? ""}
          onChange={(e) => setField("notes", e.target.value)}
          rows={4}
          className={`${inputClass} resize-y font-mono text-sm`}
          placeholder="Anything else worth remembering…"
        />
      </Field>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={busy}
          className="border border-palette-primary rounded px-6 py-2 hover:bg-gray-800 transition disabled:opacity-50"
        >
          {busy ? "Saving…" : "Save password"}
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