import { useState } from 'react';
import { STATUSES, type Status, type Task } from '../types';
import type { Action } from '../lib/tasks';
import TaskForm from './TaskForm';

interface Props {
  task: Task;
  dispatch: (a: Action) => void;
}

export default function TaskItem({ task, dispatch }: Props) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <li className="task" data-testid="task-item">
        <TaskForm
          initialTitle={task.title}
          initialPriority={task.priority}
          submitLabel="Simpan"
          onSubmit={(title, priority) => {
            dispatch({ type: 'update', id: task.id, title, priority });
            setEditing(false);
          }}
          onCancel={() => setEditing(false)}
        />
      </li>
    );
  }

  return (
    <li className="task" data-testid="task-item">
      <div className="task-main">
        <span className="task-title" data-testid="task-title">{task.title}</span>
        <span className={`badge ${task.priority.toLowerCase()}`}>{task.priority}</span>
      </div>
      <div className="task-actions">
        <select
          data-testid="status-select"
          aria-label={`Status ${task.title}`}
          value={task.status}
          onChange={(e) => dispatch({ type: 'setStatus', id: task.id, status: e.target.value as Status })}
        >
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button type="button" data-testid="edit-button" onClick={() => setEditing(true)}>Edit</button>
        <button type="button" data-testid="delete-button" onClick={() => dispatch({ type: 'remove', id: task.id })}>
          Hapus
        </button>
      </div>
    </li>
  );
}
