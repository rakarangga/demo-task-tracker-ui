import { useEffect, useReducer } from 'react';
import { loadTasks, saveTasks } from '../lib/storage';
import { tasksReducer } from '../lib/tasks';

export function useTasks() {
  const [tasks, dispatch] = useReducer(tasksReducer, undefined, loadTasks);
  useEffect(() => saveTasks(tasks), [tasks]);
  return { tasks, dispatch };
}
