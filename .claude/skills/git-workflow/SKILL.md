---
name: git-workflow
description: "Use for every git action in a squad task: starting a task branch from the request's integration branch, committing, pushing to the fork, merging approved work into the integration branch, and resolving conflicts. Never touches master/main or the source repo."
---


# git-workflow

## Branch model (per request)
```
<default branch>  (master/main on the fork)       humans merge here, never agents
  └── agent/integration/<REQ-ID>                  Project Manager creates and merges approved sub-branches
        └── agent/<agent>/<issue>                 one per sub-issue (Multica creates it)
```

## Sync with the source (Project Manager, owner decision 2026-10-13)
The source repo (`devmhk/<repo>` today) is the source of truth; the fork is the agents' workspace. People may commit to the source or the fork by hand between requests. Before agents edit, the integration branch must contain both.

1. Remote for the source (once per checkout, read-only key from `repo-access`):
   `git remote get-url upstream >/dev/null 2>&1 || git remote add upstream git@<SRC_ALIAS>:<SOURCE>.git`
2. `git fetch origin && git fetch upstream`
3. On `agent/integration/<REQ-ID>` (new: create it from `origin/<default>` first):
   - `git merge-base --is-ancestor origin/<default> HEAD || git merge --no-ff origin/<default> -m "merge: sync fork <default> into <REQ-ID>"`
   - `git merge-base --is-ancestor upstream/<default> HEAD || git merge --no-ff upstream/<default> -m "merge: sync source <SOURCE> <default> into <REQ-ID>"`
4. Run the repo's quick check, push the integration branch, and write `Basis: fork <sha of origin/<default>>, source <sha of upstream/<default>>` in the parent issue.
5. Conflict: `git merge --abort`, open a sub-issue for the Engineer ("merge `upstream/<default>` into `agent/integration/<REQ-ID>` and resolve"; the Engineer works on a task branch from the integration branch, then the Reviewer). No other task starts before it is merged.
6. Repeat steps 2–4 before "siap review owner".
7. No source access yet (`git fetch upstream` refused): do not guess. Note "source tidak dicek" in the parent issue and ask the owner to run `repo-access` "Akses baca source" or to sync the fork first.

Never push to `upstream`, never change `master`/`main` of the fork or the source: the sync happens only on the integration branch, and humans bring it to `master` through the PR.

## Start a task
1. `git fetch origin`
2. `git merge --no-edit origin/agent/integration/<REQ-ID>` (name is in the parent issue). Conflict at this point: stop and tell the Project Manager.
3. `git status` must be clean before you change anything.
4. If the checkout has no identity, set it for this worktree only: `git config user.name "<Agent> (mhk-code agent)"`, `git config user.email "<agent>@agents.invalid"`. Never set global config.

## Commit
- Small, focused commits. Conventional Commits: `feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`, `build:`, `ci:`.
- Subject in imperative, ≤ 72 chars; body explains why when it is not obvious; reference the issue (`Refs WORK-12`).
- Never commit: `.env`, keys, certificates, dumps, build output, `node_modules`, IDE folders. Check `git diff --cached --stat` before every commit.
- No commented-out code, no `*_old`/`*.bak` copies.

## Push
- `git push -u origin HEAD` (your task branch only).
- Never `--force` on a shared branch. `--force-with-lease` only on your own task branch, and only before anyone reviewed it.

## Merge into the integration branch (Project Manager)
1. Only after the Reviewer's `APPROVE` on that sub-issue.
2. `git switch agent/integration/<REQ-ID> && git pull --ff-only`
3. `git merge --no-ff origin/agent/<agent>/<issue> -m "merge: <issue> <title>"`
4. Run the repo's quick check (`docker compose -f compose.dev.yaml run --rm test` when available), then `git push`.
5. Conflict: `git merge --abort`, open a sub-issue for the Engineer: "rebase/merge `agent/integration/<REQ-ID>` into `<branch>` and resolve".

## Conflicts (Engineer)
- Resolve in your own task branch by merging the integration branch in. Keep both intents; when the right result is unclear, ask the Project Manager.
- After resolving, rerun the checks and say in the report which files had conflicts and how they were resolved.

## Never
- Push, merge, or rebase `master`/`main`. Push to the source repo (`upstream`). Merge `upstream` anywhere except the integration branch (Project Manager only). Delete branches you did not create. Rewrite published history.
