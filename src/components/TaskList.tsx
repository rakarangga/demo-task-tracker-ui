import type { Task } from '../types';
import type { Action } from '../lib/tasks';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, dispatch }: { tasks: Task[]; dispatch: (a: Action) => void }) {
  if (tasks.length === 0) return <p className="empty" data-testid="empty">Tidak ada tugas.</p>;
  return (
    <ul className="task-list">
      {tasks.map((t) => <TaskItem key={t.id} task={t} dispatch={dispatch} />)}
    </ul>
  );
}
