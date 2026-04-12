# Errors and Fixes

## 1. Vite Build Failures (Rollup Resolve Imports)
- **Error:** The Docker build for `frontend-authority` crashed with exit code 1. `[vite]: Rollup failed to resolve import ".app.jsx"`.
- **Why it Happened:** Case sensitivity and typo in imports in `main.jsx` (`import App from '.app.jsx'`). Linux-based Docker containers are completely case-sensitive compared to local Windows development.
- **Fix:** Changed import to exactly matches the filenames (e.g., `./app.jsx`). 
- **What not to repeat:** Always ensure case-exact imports for all React components in Vite. Do not rely on Windows case-insensitivity.

## 2. Docker Compose Hangs or Build Context Errors
- **Error:** General Dockerizing errors when moving frontend folders around.
- **Why it Happened:** Dockerfile paths and Docker Compose context paths became mismatched.
- **Fix:** Realigned `./frontend-<name>` context build definitions in the `docker-compose.yml`.
- **What not to repeat:** If renaming folders, always update the Docker Compose configurations and volume mounts simultaneously.
