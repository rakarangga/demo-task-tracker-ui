# demo-task-tracker-ui

Aplikasi task tracker demo (React 18 + TypeScript + Vite). Tanpa backend/DB/login; data mock + localStorage. Mode DEMO. PRD: `docs/prd/REQ-20261014-demo-task-tracker-ui/PRD-v1.md`. Arsitektur: `docs/architecture.md`.

## Perintah (semua lewat Docker, jangan pasang toolchain di host)
- Jalankan: `docker compose -f compose.dev.yaml up -d --build` → http://127.0.0.1:8080 (ubah dengan `APP_PORT`, lihat `.env.example`).
- Test: `docker compose -f compose.dev.yaml run --rm test` (Vitest lalu Playwright; service `test` memakai profile `test`).
- Typecheck/build: `docker compose -f compose.dev.yaml exec app npm run build`.

## Aturan
- Port hanya dipublikasikan di `127.0.0.1` (`127.0.0.1:${APP_PORT}:5173`); jangan `0.0.0.0` di compose. `--host 0.0.0.0` hanya di dalam container.
- Logika murni di `src/lib/` (reducer, filter, summarize); dashboard dihitung dari seluruh tugas, filter hanya untuk daftar.
- Mock hanya di-seed bila localStorage kosong; jangan menimpa data tersimpan.
- Selector test memakai `data-testid` stabil.
- Tanpa dependency baru, router, state library, atau UI library. Hanya scope PRD (4 AC). Tanpa CI/deploy.
- Branch kerja `agent/<agent>/<issue>`; jangan push ke `master`/`main`.
