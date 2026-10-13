import { filterTasks, summarize, tasksReducer } from './tasks';
import type { Task } from '../types';

const base: Task[] = [
  { id: '1', title: 'Alpha', status: 'To Do', priority: 'High' },
  { id: '2', title: 'Beta', status: 'Done', priority: 'Low' },
];

describe('tasksReducer', () => {
  it('add, update, setStatus, remove', () => {
    let t = tasksReducer(base, { type: 'add', task: { id: '3', title: 'C', status: 'To Do', priority: 'Low' } });
    expect(t).toHaveLength(3);
    t = tasksReducer(t, { type: 'update', id: '3', title: 'C2', priority: 'High' });
    expect(t.find((x) => x.id === '3')).toMatchObject({ title: 'C2', priority: 'High' });
    t = tasksReducer(t, { type: 'setStatus', id: '3', status: 'In Progress' });
    expect(t.find((x) => x.id === '3')?.status).toBe('In Progress');
    t = tasksReducer(t, { type: 'remove', id: '3' });
    expect(t).toEqual(base);
  });
});

describe('filterTasks', () => {
  it('menyaring query, status, prioritas', () => {
    expect(filterTasks(base, { query: 'alp', status: 'All', priority: 'All' })).toHaveLength(1);
    expect(filterTasks(base, { query: '', status: 'Done', priority: 'All' })[0].id).toBe('2');
    expect(filterTasks(base, { query: '', status: 'All', priority: 'High' })[0].id).toBe('1');
    expect(filterTasks(base, { query: 'zzz', status: 'All', priority: 'All' })).toHaveLength(0);
  });
});

describe('summarize', () => {
  it('menghitung dari seluruh data', () => {
    expect(summarize(base)).toEqual({ todo: 1, inProgress: 0, done: 1, total: 2 });
  });
});
