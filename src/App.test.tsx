import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { STORAGE_KEY } from './lib/storage';

const num = (id: string) => Number(screen.getByTestId(id).textContent);

function expectConsistent() {
  expect(num('summary-total')).toBe(num('summary-todo') + num('summary-in-progress') + num('summary-done'));
}

describe('App', () => {
  it('menampilkan seed dan angka cocok dengan daftar', () => {
    render(<App />);
    expect(screen.getAllByTestId('task-item')).toHaveLength(num('summary-total'));
    expectConsistent();
  });

  it('tambah, ubah status, edit, hapus menjaga konsistensi dan menyimpan', async () => {
    const user = userEvent.setup();
    render(<App />);
    const total = num('summary-total');
    const todo = num('summary-todo');

    await user.type(screen.getByTestId('task-title-input'), 'Tugas baru');
    await user.click(screen.getByTestId('task-submit'));
    expect(num('summary-total')).toBe(total + 1);
    expect(num('summary-todo')).toBe(todo + 1);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toHaveLength(total + 1);

    const item = screen.getAllByTestId('task-item')[0];
    await user.selectOptions(within(item).getByTestId('status-select'), 'Done');
    expect(num('summary-todo')).toBe(todo);
    expectConsistent();

    await user.click(within(screen.getAllByTestId('task-item')[0]).getByTestId('edit-button'));
    const editing = within(screen.getAllByTestId('task-item')[0]);
    const input = editing.getByTestId('task-title-input');
    await user.clear(input);
    await user.type(input, 'Diubah');
    await user.click(editing.getByTestId('task-submit'));
    expect(screen.getByText('Diubah')).toBeInTheDocument();

    await user.click(within(screen.getAllByTestId('task-item')[0]).getByTestId('delete-button'));
    expect(num('summary-total')).toBe(total);
    expectConsistent();
  });

  it('menolak judul kosong', async () => {
    const user = userEvent.setup();
    render(<App />);
    const total = num('summary-total');
    await user.type(screen.getByTestId('task-title-input'), '   ');
    await user.click(screen.getByTestId('task-submit'));
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(num('summary-total')).toBe(total);
  });

  it('cari dan filter hanya menyaring daftar, bukan angka dashboard', async () => {
    const user = userEvent.setup();
    render(<App />);
    const total = num('summary-total');
    await user.type(screen.getByTestId('search-input'), 'dokumentasi');
    expect(screen.getAllByTestId('task-item')).toHaveLength(1);
    expect(num('summary-total')).toBe(total);
    await user.clear(screen.getByTestId('search-input'));
    await user.selectOptions(screen.getByTestId('filter-status'), 'Done');
    expect(screen.getAllByTestId('task-item')).toHaveLength(num('summary-done'));
    await user.selectOptions(screen.getByTestId('filter-priority'), 'Low');
    expect(screen.getByTestId('empty')).toBeInTheDocument();
  });
});
