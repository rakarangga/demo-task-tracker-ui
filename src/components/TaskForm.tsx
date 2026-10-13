import { useState, type FormEvent } from 'react';
import { PRIORITIES, type Priority } from '../types';
import { isValidTitle } from '../lib/tasks';

interface Props {
  initialTitle?: string;
  initialPriority?: Priority;
  submitLabel: string;
  onSubmit: (title: string, priority: Priority) => void;
  onCancel?: () => void;
}

export default function TaskForm({
  initialTitle = '',
  initialPriority = 'Medium',
  submitLabel,
  onSubmit,
  onCancel,
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [priority, setPriority] = useState<Priority>(initialPriority);
  const [error, setError] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isValidTitle(title)) {
      setError('Judul tidak boleh kosong');
      return;
    }
    onSubmit(title.trim(), priority);
    if (!onCancel) {
      setTitle('');
      setPriority('Medium');
    }
    setError('');
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        data-testid="task-title-input"
        aria-label="Judul tugas"
        placeholder="Judul tugas"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        data-testid="task-priority-select"
        aria-label="Prioritas"
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
      >
        {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
      </select>
      <button type="submit" data-testid="task-submit">{submitLabel}</button>
      {onCancel && <button type="button" onClick={onCancel}>Batal</button>}
      {error && <p role="alert" className="error">{error}</p>}
    </form>
  );
}
