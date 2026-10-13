# Test

| Jenis | Lokasi | Cakupan |
|---|---|---|
| Unit (Vitest + RTL, jsdom) | `src/**/*.test.ts(x)` | reducer, filter, summarize, storage (seed/tidak menimpa/JSON rusak), alur UI + konsistensi dashboard |
| E2E (Playwright, chromium) | `e2e/tasks.spec.ts` | seed, tambah, ubah status, edit, hapus, cari/filter, reload + localStorage, tanpa error console, viewport 375px |

Jalankan: `docker compose -f compose.dev.yaml run --rm test` (otomatis menyalakan `app`). Bila port 8080 bentrok: `APP_PORT=8081 docker compose ...`.
