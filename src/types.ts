export const STATUSES = ['To Do', 'In Progress', 'Done'] as const;
export const PRIORITIES = ['Low', 'Medium', 'High'] as const;

export type Status = (typeof STATUSES)[number];
export type Priority = (typeof PRIORITIES)[number];

export interface Task {
  id: string;
  title: string;
  status: Status;
  priority: Priority;
}

export interface Filters {
  query: string;
  status: Status | 'All';
  priority: Priority | 'All';
}
