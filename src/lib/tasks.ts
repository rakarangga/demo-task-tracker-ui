import type { Filters, Priority, Status, Task } from '../types';

export type Action =
  | { type: 'add'; task: Task }
  | { type: 'update'; id: string; title: string; priority: Priority }
  | { type: 'remove'; id: string }
  | { type: 'setStatus'; id: string; status: Status };

export function tasksReducer(tasks: Task[], action: Action): Task[] {
  switch (action.type) {
    case 'add':
      return [action.task, ...tasks];
    case 'update':
      return tasks.map((t) =>
        t.id === action.id ? { ...t, title: action.title, priority: action.priority } : t,
      );
    case 'remove':
      return tasks.filter((t) => t.id !== action.id);
    case 'setStatus':
      return tasks.map((t) => (t.id === action.id ? { ...t, status: action.status } : t));
  }
}

export function filterTasks(tasks: Task[], { query, status, priority }: Filters): Task[] {
  const q = query.trim().toLowerCase();
  return tasks.filter(
    (t) =>
      (q === '' || t.title.toLowerCase().includes(q)) &&
      (status === 'All' || t.status === status) &&
      (priority === 'All' || t.priority === priority),
  );
}

export function summarize(tasks: Task[]) {
  const count = (s: Status) => tasks.filter((t) => t.status === s).length;
  return { todo: count('To Do'), inProgress: count('In Progress'), done: count('Done'), total: tasks.length };
}

export function isValidTitle(title: string): boolean {
  return title.trim().length > 0;
}

/** randomUUID hanya ada di secure context; service test mengakses lewat http://app. */
export function newId(): string {
  return typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `t-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
