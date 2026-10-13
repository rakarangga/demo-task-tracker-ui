import { loadTasks, saveTasks, STORAGE_KEY } from './storage';
import { mockTasks } from '../data/mockTasks';

describe('storage', () => {
  it('seed mock saat kosong', () => {
    expect(loadTasks()).toEqual(mockTasks);
  });
  it('tidak menimpa data tersimpan', () => {
    const t = [{ id: 'x', title: 'X', status: 'Done' as const, priority: 'Low' as const }];
    saveTasks(t);
    expect(loadTasks()).toEqual(t);
  });
  it('array kosong tetap kosong', () => {
    saveTasks([]);
    expect(loadTasks()).toEqual([]);
  });
  it('JSON rusak jatuh ke seed', () => {
    localStorage.setItem(STORAGE_KEY, '{rusak');
    expect(loadTasks()).toEqual(mockTasks);
  });
});
