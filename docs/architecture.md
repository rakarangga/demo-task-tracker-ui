# Arsitektur

## Stack
React 18 + TypeScript + Vite, CSS biasa (mobile-first, breakpoint 640px). Tanpa router, state library, UI library (PRD C2). State: `useReducer` + persist ke localStorage. Dev server Vite di container (bukan nginx; deploy non-goal).

## Alur data
mock (`data/mockTasks.ts`) → `loadTasks()` → reducer (`useTasks`) → UI → `saveTasks()` (localStorage) pada tiap perubahan.

## Folder
| Path | Isi |
|---|---|
| `src/types.ts` | `Task`, `Status`, `Priority`, `Filters` |
| `src/data/mockTasks.ts` | seed awal (A1) |
| `src/lib/tasks.ts` | reducer, `filterTasks`, `summarize`, `isValidTitle`, `newId` (murni) |
| `src/lib/storage.ts` | load/save, key `task-tracker.tasks.v1` |
| `src/hooks/useTasks.ts` | reducer + inisialisasi + persist |
| `src/components/` | Dashboard, TaskFilters, TaskForm, TaskList, TaskItem |
| `e2e/tasks.spec.ts` | satu alur Playwright |
| `.docker/` | `Dockerfile` (target `dev`), `Dockerfile.test` (image Playwright) |

## Aturan konsistensi
`summarize` dihitung dari seluruh tugas (A7); `filterTasks` hanya menyaring daftar. `loadTasks`: key kosong → seed; ada nilai (termasuk `[]`) → pakai; JSON/skema rusak → seed. Seed tidak menimpa data tersimpan (BR4).

Format: `Task { id, title, status: 'To Do'|'In Progress'|'Done', priority: 'Low'|'Medium'|'High' }`.

## Docker
- `app`: `npm run dev --host 0.0.0.0 --port 5173` di dalam container; publish `127.0.0.1:${APP_PORT:-8080}:5173`; bind mount `./:/app`.
- `test` (profile `test`): image Playwright, `BASE_URL=http://app:5173`, menjalankan Vitest lalu Playwright.
- `compose.yaml`: salinan minimal tanpa bind mount; tidak ada deploy.

## Ditolak
react-router, Redux/Zustand, Tailwind/MUI, uuid (pakai `crypto.randomUUID` dengan fallback), nginx.

## Non-goals
Backend/API/DB, login, CI, Lighthouse, deploy, multi-pengguna.
