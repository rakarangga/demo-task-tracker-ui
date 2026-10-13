---
name: docker-runtime
description: Use whenever an app must be built, run, or tested, or when a repo needs Docker files. Defines the repo Docker contract for any stack (.docker/, compose.dev.yaml, compose.yaml, .env.example, test service) and how to use the runner's rootless Docker on the VPS.
---

# docker-runtime

Every repo runs and tests the same way on the VPS and on the developer's PC, whatever the language.

## Repo contract
```
.docker/Dockerfile        multi-stage; pinned, supported base image; non-root USER; HEALTHCHECK
.docker/config/ scripts/  runtime config (web server, php.ini, entrypoint) when needed
compose.dev.yaml          app + dependencies (db, cache, queue); ports bound to 127.0.0.1; mem_limit; healthchecks; named volumes
compose.yaml              production-like: image tag, env file mounted at runtime; external networks allowed
.env.example              every variable with a safe dummy value; real .env is gitignored
.dockerignore             .git, .env*, dumps, keys, certs, node_modules, vendor, build output, test reports
tests/                    run by a `test` service: docker compose -f compose.dev.yaml run --rm test
AGENTS.md                 "Run" section with the exact commands below and the local URL
```

## Standard commands
```
docker compose -f compose.dev.yaml up -d --build
docker compose -f compose.dev.yaml ps
docker compose -f compose.dev.yaml logs --tail=100 app
docker compose -f compose.dev.yaml run --rm test
docker compose -f compose.dev.yaml down          # add -v only to reset dev data
```

## Dockerfile rules
- Pin base images to a supported major/minor (e.g. `node:22-alpine`, `python:3.12-slim`, `php:8.3-fpm-alpine`, `golang:1.23` + `gcr.io/distroless/static`). Never EOL bases.
- Multi-stage: build tools in the build stage, only runtime artifacts in the final stage.
- Install dependencies from lockfiles (`npm ci`, `pip install -r requirements.txt --no-cache-dir`, `composer install --no-dev`, `go mod download`). Copy lockfiles before source for layer caching.
- `USER` non-root, `EXPOSE` the app port, `HEALTHCHECK` that hits a cheap endpoint.
- Secrets never in the image: no `COPY .env`, no `ARG`/`ENV` with real values. Runtime env comes from `env_file`/mounts.
- Timezone via `TZ=Asia/Jakarta` env when the app needs local time.

## compose.dev.yaml rules
- Ports: `"127.0.0.1:<host>:<container>"` only. Dev host port is 5 digits starting with **1** (10000-19999, owner decision 2026-10-12), one fixed port per project, e.g. `127.0.0.1:18080:8080`. Check it is free on the VPS (`ss -ltn`) and write it in `AGENTS.md`. Never use 8080 or other 4-digit host ports (Multica and other services use them).
- Each dependency is a service in the file (e.g. `db: mysql:8.4` / `postgres:17`, `redis:7`), with a named volume and a healthcheck; `app` uses `depends_on: condition: service_healthy`.
- `mem_limit` on every service (default 512m; db 512m). The VPS has 2 vCPU / 3.6 GiB shared with other services.
- A `test` service (profile `test` or the same image) that runs the suite and exits non-zero on failure.

## On the VPS (runner)
- Rootless Docker: `DOCKER_HOST` is set for agent runs. Check with `docker info` first; if it fails, do not install anything. Write the commands as local test steps for Dev1 and say Docker was unavailable.
- You cannot see or touch other containers on the host; do not try.
- Always `down` what you started at the end of the run, unless the task says to leave it running.
- No `docker push`, no registry login, no `--privileged`, no host network, no bind mounts outside the worktree.
- Heavy images (Android SDK, Xcode, desktop installers) do not fit; build what fits and document the rest for local.

## Troubleshooting order
1. `docker compose ... ps` and `logs` of the failing service.
2. Healthcheck output: `docker inspect --format '{{json .State.Health}}' <container>`.
3. Port in use: choose another host port. Out of memory (exit 137): lower parallelism or raise that service's `mem_limit` within the budget.
4. Report the exact command, the error, and what you tried.
