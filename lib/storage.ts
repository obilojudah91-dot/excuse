import { ArchiveEntry, Diagnosis } from "./types";

const KEY = "excuse.archive.v1";

export function loadArchive(): ArchiveEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as ArchiveEntry[];
  } catch {
    return [];
  }
}

export function saveToArchive(diagnosis: Diagnosis): ArchiveEntry[] {
  const entry: ArchiveEntry = {
    caseNumber: diagnosis.caseNumber,
    excuse: diagnosis.excuse,
    diagnosisName: diagnosis.name,
    severity: diagnosis.severity,
    timestamp: diagnosis.timestamp,
  };
  const current = loadArchive();
  const next = [entry, ...current].slice(0, 200);
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable — archive simply won't persist this session */
  }
  return next;
}

export function deleteFromArchive(caseNumber: string): ArchiveEntry[] {
  const next = loadArchive().filter((e) => e.caseNumber !== caseNumber);
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* noop */
  }
  return next;
}

export function clearArchive(): ArchiveEntry[] {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* noop */
  }
  return [];
}
