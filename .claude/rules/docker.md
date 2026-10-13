# Docker
- Publish port selalu `127.0.0.1:${APP_PORT:-8080}:5173`.
- Service `test` pakai profile `test`, tanpa `ports`, mengakses `http://app:5173`.
- Versi `@playwright/test` di `package.json` harus sama dengan tag image `.docker/Dockerfile.test`.
- Jangan commit `.env`.
