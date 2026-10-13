# Handoff REQ-20261014-demo-task-tracker-ui — LANGKAH MULTICA (jalur BESAR)

Ditulis hanya setelah `PRD_APPROVED` (prd-workflow §6, multica-handoff §1 varian A).

| Field | Nilai |
|---|---|
| REQ-ID | REQ-20261014-demo-task-tracker-ui |
| Versi PRD disetujui | v1 |
| File PRD beku | `/opt/hermes/home/prd/REQ-20261014-demo-task-tracker-ui/PRD-v1.md` (20821 B, md5 `09f2123d01b0649d7f9a920d0363d9cd`) |
| Plane key | DTUI-1 |
| Mode | DEMO (prd-workflow §2b — maks 4 AC) |
| Risk | LOW |
| Jalur | BESAR (ditetapkan owner, diteruskan HQ; TIDAK dinilai ulang) |
| Tanggal handoff | 2026-10-14 00:43 WIB |
| Approver PRD (gate 1) | artrios via Hermes CLI `--source artrios`, instruksi eksplisit raka |
| Waktu approval PRD | 2026-10-14 00:43 WIB |
| Approval langkah Multica (gate 2) | BELUM ADA — diajukan 2026-10-14 00:43 WIB, menunggu keputusan owner |
| State | READY_FOR_MULTICA (langkah Multica BELUM dieksekusi) |

---

## 1. Request ID + tautan ke PRD yang disetujui

- REQ-ID: `REQ-20261014-demo-task-tracker-ui`
- PRD disetujui: `PRD-v1.md` (v1) — `/opt/hermes/home/prd/REQ-20261014-demo-task-tracker-ui/PRD-v1.md`, md5 `09f2123d01b0649d7f9a920d0363d9cd`, 20821 B.
- Lampiran handoff: PRD di atas + berkas `handoff.md` ini, dilampirkan APA ADANYA pada issue induk Multica saat langkah Multica dieksekusi (multica-handoff §4a). PM WAJIB meng-commit keduanya apa adanya ke `docs/prd/REQ-20261014-demo-task-tracker-ui/` di branch integrasi sebelum PR di akhir.

## 2. Versi PRD, approver, timestamp

- Versi: PRD v1 (versi persis yang disetujui; bukan draf lain).
- Approver: artrios, atas instruksi eksplisit raka; diterima langsung lewat Hermes CLI dengan `--source artrios` (sesi terverifikasi: `HERMES_SESSION_SOURCE=artrios`, `HERMES_SESSION_SOURCE_EXPLICIT=1`).
- Kutipan keputusan owner (persis): "approve PRD v1 REQ-20261014-demo-task-tracker-ui md5 09f2123d01b0649d7f9a920d0363d9cd".
- Timestamp: 2026-10-14 00:43 WIB (jam sistem). Dicatat di `approvals.md` dan `reports/ops-feed.md`.
- OQ1–OQ8 (semua `[NON-BLOCKING]`) diterima apa adanya; asumsi A1–A9 berlaku sampai owner mengoreksi.

## 3. Target repo + izin yang diizinkan

- Repo sumber: `devmhk/demo-task-tracker-ui`.
- Fork target kerja squad: `rakarangga/demo-task-tracker-ui`.
- Project Multica: BARU, nama = nama repo target PERSIS → `demo-task-tracker-ui` (multica-handoff §3; tanpa `REQ-ID` pada nama project). Cek duplikasi project WAJIB lebih dulu (kunci = nama repo / resource `github_repo`).
- Issue induk: BARU (jalur BESAR) di project itu, assignee squad/Project Manager, judul memuat REQ-ID.
- Izin yang diminta: buat/ubah berkas di dalam fork pada BRANCH saja.
- Deploy key fork/source (bila diperlukan pada tahap implementasi): diminta lewat owner di GitHub UI (pola sama seperti REQ-20261013-portofolio-landing); BUKAN wewenang engineering-management (OQ8).

## 4. Mode, Risk, scope, non-goals, acceptance criteria, risiko, dependencies

**Mode:** DEMO. **Risk:** LOW (aplikasi front-end demo, tanpa backend/API/DB/login, data mock lokal, dijalankan di `127.0.0.1`; hanya branch, tanpa merge/deploy).

**Scope (PRD §9):** aplikasi task tracker React + TypeScript + Vite, CSS responsif, mock data awal, persistensi localStorage; dashboard ringkasan jumlah tugas per status + daftar tugas (To Do / In Progress / Done); tambah / edit / hapus, pencarian, filter status & prioritas, perubahan status lewat UI; unit test Vitest/RTL + browser/E2E test Playwright (diminta eksplisit owner); `compose.dev.yaml` untuk menjalankan lokal di `127.0.0.1`.

**Non-goals (PRD §10):** backend/API/database; autentikasi/login; integrasi eksternal; refactoring tak terkait; dependency tanpa kebutuhan jelas; Lighthouse; quality gate per halaman; CI; deploy; hosting/publikasi/domain/TLS; multi-pengguna/kolaborasi/sinkronisasi; data perusahaan atau pribadi nyata; perubahan pada repo/infra/project lain. PENGECUALIAN disengaja: test otomatis (Vitest/RTL + Playwright) TERMASUK scope karena diminta eksplisit owner.

**Acceptance criteria (PRD §12) — TEPAT 4 AC (mode DEMO):**
- AC1. `docker compose -f compose.dev.yaml up -d --build` berhasil membangun dan menjalankan aplikasi; halaman dapat dibuka di `127.0.0.1:<port>`; port TIDAK terikat ke `0.0.0.0`. Bukti: exit code 0, `docker compose ps`, cek bind port.
- AC2. Dashboard merangkum jumlah tugas per status; daftar mendukung To Do / In Progress / Done serta tambah / edit / hapus, pencarian, filter status & prioritas, dan perubahan status melalui UI. Bukti: inspeksi UI/DOM + langkah uji yang menunjukkan tiap operasi mengubah daftar DAN angka ringkasan secara konsisten.
- AC3. Mock data awal tersedia; perubahan tersimpan di localStorage dan bertahan setelah reload; unit test Vitest/RTL dan browser/E2E Playwright LULUS; tidak ada error console yang menghambat alur utama. Bukti: log test + verifikasi localStorage setelah reload + tangkapan konsol.
- AC4. Raka memeriksa fungsi utama dan tampilan desktop/mobile saat UAT lokal. Bukti: catatan hasil UAT manual owner.

**Risiko (PRD §16, semua LOW):** R1 angka dashboard tidak konsisten dengan daftar (mitigasi BR2/UK2/AC2); R2 mock menimpa data tersimpan (BR4); R3 port terikat `0.0.0.0` (C4/AC1); R4 Playwright flaky (selector stabil, burn limit C13); R5 scope melebar (non-goals + OQ5/OQ6); R6 dependency tambahan (C2); R7 fork/akses belum siap (D3, langkah pertama PM `repo-access`).

**Dependencies (PRD §15):** D1 approval PRD v1 — TERPENUHI 2026-10-14 00:43 WIB; D2 approval langkah Multica — BELUM; D3 fork `rakarangga/demo-task-tracker-ui` siap + akses squad (via skill `repo-access`, bukan oleh PRD ini); D4 project Multica BARU + squad Project Manager tersedia; D5 mock data + asumsi A1–A9 diterima owner (bersamaan approval PRD).

**Burn limit demo (PRD C13, dari brief owner):** 12 runs, 30 menit, atau permintaan perubahan kedua pada sub-issue.

## 5. Cek/tes yang harus dijalankan + kriteria selesai

- `docker compose -f compose.dev.yaml up -d --build` → build lulus, aplikasi jalan di `127.0.0.1` (port sesuai A5, usulan 8080); verifikasi tidak bind `0.0.0.0`.
- Unit test Vitest + React Testing Library LULUS; browser/E2E test Playwright LULUS.
- Cek manual: tiap operasi (tambah/edit/hapus/ubah status/pencarian/filter) mengubah daftar DAN angka ringkasan secara konsisten; reload → data tetap (localStorage); tanpa error console yang menghambat alur utama.
- Kriteria selesai: AC1–AC4 lulus DENGAN BUKTI perintah/output (bukan klaim), dilaporkan sebagai "siap review owner"; tanpa merge/deploy.
- UAT manual owner (fungsi utama + tampilan desktop/mobile) selesai.

## 6. Batas

- Branch saja. TANPA merge, TANPA deploy, TANPA kredensial produksi.
- Tidak menyentuh repo/infra/project Multica lain. Tidak bind `0.0.0.0` (`org-operating-rules` §6).
- Data 100% mock/lokal: dilarang memuat data perusahaan atau pribadi nyata.
- Tidak ada rahasia/token di aplikasi, repo, komentar, atau log.

## 7. Apa yang harus dikembalikan + reviewer berikutnya

- Yang dikembalikan: laporan "siap review owner" dengan bukti uji (log Vitest + Playwright, bukti `docker compose`/bind port, bukti localStorage setelah reload), tautan branch, dan status tiap AC.
- Reviewer berikutnya: owner raka (UAT manual, AC4). PM menandai "siap review owner" sebagai komentar AGENT di issue induk (sinyal monitor HQ, multica-handoff §7b).
- Langkah pertama Project Manager: jalankan skill `repo-access` (HERM-35); project baru → langkah 0 = scaffold (HERM-36); fork `rakarangga/demo-task-tracker-ui` dibuat/disiapkan pada tahap itu.

## Open question yang dibawa ke HQ/owner

- OQ-LEAD [NON-BLOCKING, belum diputuskan]: handoff ini TIDAK menyebut lead project Multica (multica-handoff §3: bila handoff tidak menyebut lead, JANGAN mengarang). Keputusan yang dibutuhkan: apakah project `demo-task-tracker-ui` dibuat dengan `--lead` (mis. squad `mhk-code` / Project Manager), atau tanpa lead seperti project `portofolio-landing` sebelumnya. Ini perlu diputuskan SEBELUM langkah Multica dieksekusi, bersamaan dengan approval KEDUA.
