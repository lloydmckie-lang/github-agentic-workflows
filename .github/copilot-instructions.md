# Copilot Instructions for `github-agentic-workflows`

## Big picture architecture
- This is a **2-part app**: Flask API in `backend/` and React (Vite) UI in `frontend/`.
- UI talks to API via relative `/api/*` calls (see `frontend/src/App.jsx`).
- Vite dev server proxies `/api` to `http://localhost:5000` (see `frontend/vite.config.js`), so frontend code should not hardcode backend hostnames.
- Backend state is currently **in-memory** (`items`, `next_id` in `backend/app.py`), so data resets on server restart.

## Service boundaries and data flow
- API routes are in `backend/app.py`:
  - `GET /api/health`
  - `GET /api/items`
  - `POST /api/items` with body `{ "name": string }`
  - `DELETE /api/items/<id>`
- Frontend behavior in `frontend/src/App.jsx` mirrors these endpoints:
  - initial load -> `fetch('/api/items')`
  - add -> `POST /api/items`
  - delete -> `DELETE /api/items/:id`
- Keep request/response shapes aligned across both layers when changing endpoints.

## Critical workflows (local)
- Backend setup/run:
  - `cd backend && pip install -r requirements.txt`
  - `python app.py`
- Frontend setup/run:
  - `cd frontend && npm install`
  - `npm run dev`
- Frontend quality gates:
  - `npm run lint`
  - `npm run build`
  - `npm test`
- Backend tests:
  - `cd backend && python -m pytest test_app.py -v`

## CI/CD behavior to respect
- GitHub Actions build job in `.github/workflows/build-deploy.yml` runs from `frontend/` using Node 20.
- CI currently installs with `npm ci` and runs `npm run build` (not frontend lint/test, and not backend tests).
- If you add required checks, ensure workflow updates stay consistent with existing `frontend/` working-directory assumptions.

## Project-specific patterns
- Frontend tests mock `global.fetch` directly (`frontend/src/test/App.test.jsx`) and use Testing Library + Vitest.
- Test environment is configured in `frontend/vite.config.js` with `jsdom` and `frontend/src/test/setup.js`.
- Flask tests reset mutable module globals before each test (`reset_items` fixture in `backend/test_app.py`). Preserve this pattern when adding backend tests around global state.

## Integration and change guidance
- For API changes, update **all three** together:
  1) `backend/app.py` routes/validation,
  2) `frontend/src/App.jsx` fetch calls/UI handling,
  3) tests in `backend/test_app.py` and/or `frontend/src/test/App.test.jsx`.
- Prefer small, vertical changes (API + UI + tests) over partial edits to avoid broken contract states.
- Keep paths and folder naming as-is (`backend/`, `frontend/`); root `README.md` documents this layout and should be updated if commands/structure change.
