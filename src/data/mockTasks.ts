import type { Task } from '../types';

export const mockTasks: Task[] = [
  { id: 'mock-1', title: 'Siapkan kerangka proyek', status: 'Done', priority: 'High' },
  { id: 'mock-2', title: 'Rancang tampilan dashboard', status: 'In Progress', priority: 'Medium' },
  { id: 'mock-3', title: 'Tulis dokumentasi singkat', status: 'To Do', priority: 'Low' },
  { id: 'mock-4', title: 'Uji alur tambah dan hapus tugas', status: 'To Do', priority: 'High' },
  { id: 'mock-5', title: 'Rapikan tampilan mobile', status: 'In Progress', priority: 'Low' },
];
