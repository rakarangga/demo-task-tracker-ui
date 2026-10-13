import { PRIORITIES, STATUSES, type Filters } from '../types';

interface Props {
  filters: Filters;
  onChange: (f: Filters) => void;
}

export default function TaskFilters({ filters, onChange }: Props) {
  return (
    <section className="filters" aria-label="Cari dan filter">
      <input
        data-testid="search-input"
        type="search"
        placeholder="Cari judul…"
        aria-label="Cari judul"
        value={filters.query}
        onChange={(e) => onChange({ ...filters, query: e.target.value })}
      />
      <select
        data-testid="filter-status"
        aria-label="Filter status"
        value={filters.status}
        onChange={(e) => onChange({ ...filters, status: e.target.value as Filters['status'] })}
      >
        <option value="All">Semua status</option>
        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
      <select
        data-testid="filter-priority"
        aria-label="Filter prioritas"
        value={filters.priority}
        onChange={(e) => onChange({ ...filters, priority: e.target.value as Filters['priority'] })}
      >
        <option value="All">Semua prioritas</option>
        {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
      </select>
    </section>
  );
}
