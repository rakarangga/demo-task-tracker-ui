import { useState } from 'react';
import Dashboard from './components/Dashboard';
import TaskFilters from './components/TaskFilters';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { useTasks } from './hooks/useTasks';
import { filterTasks, newId } from './lib/tasks';
import type { Filters } from './types';

export default function App() {
  const { tasks, dispatch } = useTasks();
  const [filters, setFilters] = useState<Filters>({ query: '', status: 'All', priority: 'All' });

  return (
    <main className="container">
      <h1>Task Tracker</h1>
      <Dashboard tasks={tasks} />
      <TaskForm
        submitLabel="Tambah"
        onSubmit={(title, priority) =>
          dispatch({ type: 'add', task: { id: newId(), title, status: 'To Do', priority } })
        }
      />
      <TaskFilters filters={filters} onChange={setFilters} />
      <TaskList tasks={filterTasks(tasks, filters)} dispatch={dispatch} />
    </main>
  );
}
