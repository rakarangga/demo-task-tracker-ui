# Frontend
- Logika bisnis murni di `src/lib/`; komponen hanya menampilkan.
- Satu sumber state (`tasks` di `useTasks`); dashboard = `summarize(tasks)`, daftar = `filterTasks(tasks, filters)`.
- Judul tugas wajib tidak kosong (`isValidTitle`).
- Elemen interaktif punya `data-testid` stabil; di E2E scoping ke item bila form edit dan form tambah tampil bersamaan.
- Id baru lewat `newId()` (randomUUID tidak ada di konteks non-secure seperti `http://app`).
