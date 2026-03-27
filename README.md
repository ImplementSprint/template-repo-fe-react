# Call_Template_Single (React + Vite)

Minimal React + Vite + TypeScript + Tailwind CSS project that **calls reusable CI/CD workflows** from the `CICD-Fe_Single-test` repository.

## Local Commands

```bash
npm install
npm run dev      # Vite dev server (http://localhost:5173)
npm run build    # TypeScript check + Vite production build → dist/
npm run start    # Preview production build locally
npm run test     # Jest unit tests
npm run lint     # ESLint
```

## CI/CD Setup Required

This repository does **not** contain its own workflow definitions.
Instead, `.github/workflows/master-pipeline-fe-single.yml` calls the reusable workflows hosted in `CICD-Fe_Single-test`.

### 1) Required Branches

- `test`
- `uat`
- `main`

### 2) Required Repository Secrets

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- A secret that stores your Vercel Project ID (for example: `VERCEL_PROJECT_ID_FE_SINGLE`)

For PR auto-creation jobs, also provide one of:

- `GH_PR_TOKEN` (preferred), or
- `GHPR_TOKEN` (legacy)

### 3) Required Repository Variable

- `FE_SINGLE_SYSTEM_JSON`
  - A JSON object (or one-item array) with keys: `name`, `dir`, `image`, `vercel_project_secret`.
  - Example: `{"name":"Frontend-Root","dir":".","image":"fe-single-web","vercel_project_secret":"VERCEL_PROJECT_ID_FE_SINGLE"}`

### 4) Update Workflow Reference

In `.github/workflows/master-pipeline-fe-single.yml`, replace `OWNER/CICD-Fe_Single-test` with the actual GitHub owner/org and repo name where the reusable workflows are hosted.

### 5) Vercel Project Settings

- Link this repository to a Vercel project.
- Set the Vercel Framework Preset to **Vite**.
- Set Vercel Root Directory to `.` for this single frontend setup.

## Notes

- Unit tests generate `coverage/coverage-summary.json` for the test workflow.
- `Dockerfile` uses a multi-stage build: Node builds `dist/`, then nginx serves the static output on port 80.
- The Vite dev server runs on port 5173 by default. The E2E test uses port 4173 (configurable via `PORT` env var).
