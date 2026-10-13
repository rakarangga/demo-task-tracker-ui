import { mockTasks } from '../data/mockTasks';
import { PRIORITIES, STATUSES, type Task } from '../types';

export const STORAGE_KEY = 'task-tracker.tasks.v1';

function isTask(v: unknown): v is Task {
  const t = v as Task;
  return (
    typeof t === 'object' &&
    t !== null &&
    typeof t.id === 'string' &&
    typeof t.title === 'string' &&
    (STATUSES as readonly string[]).includes(t.status) &&
    (PRIORITIES as readonly string[]).includes(t.priority)
  );
}

/** Seed mock hanya bila belum ada data tersimpan atau data rusak (BR4). */
export function loadTasks(): Task[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === null) return mockTasks;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.every(isTask)) return parsed;
  } catch {
    // JSON rusak: jatuh ke seed
  }
  return mockTasks;
}

export function saveTasks(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
