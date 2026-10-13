import type { Task } from '../types';
import { summarize } from '../lib/tasks';

export default function Dashboard({ tasks }: { tasks: Task[] }) {
  const s = summarize(tasks);
  return (
    <section className="dashboard" aria-label="Ringkasan">
      <div className="card"><span>To Do</span><strong data-testid="summary-todo">{s.todo}</strong></div>
      <div className="card"><span>In Progress</span><strong data-testid="summary-in-progress">{s.inProgress}</strong></div>
      <div className="card"><span>Done</span><strong data-testid="summary-done">{s.done}</strong></div>
      <div className="card"><span>Total</span><strong data-testid="summary-total">{s.total}</strong></div>
    </section>
  );
}
