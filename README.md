# github-agentic-workflows

A React + Flask application. The React frontend communicates with a Flask API backend.

## Project Structure

```
.
├── backend/          # Flask API
│   ├── app.py
│   ├── requirements.txt
│   └── test_app.py
└── frontend/         # React (Vite)
    ├── src/
    │   ├── App.jsx
    │   └── test/
    ├── package.json
    └── vite.config.js
```

## Getting Started

### Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

The Flask API runs on `http://localhost:5000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The React app runs on `http://localhost:5173` and proxies `/api` requests to the Flask backend.

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/items` | List all items |
| POST | `/api/items` | Create an item (`{"name": "..."}`) |
| DELETE | `/api/items/:id` | Delete an item |

## Running Tests

**Backend**

```bash
cd backend
python -m pytest test_app.py -v
```

**Frontend**

```bash
cd frontend
npm test
```
## github next agentics

```sh

# install the extension
gh extensions install github/gh-aw

```

### [CI Doctor](https://github.com/githubnext/agentics/blob/main/docs/ci-doctor.md)
```sh

# Add the workflow to your repository
gh aw add-wizard githubnext/agentics/ci-doctor
```

### [CI Coach](https://github.com/githubnext/agentics/blob/main/docs/ci-coach.md)

```sh

# Add the workflow to your repository
gh aw add-wizard githubnext/agentics/ci-coach

```

### [Grumpy Reviewer](https://github.com/githubnext/agentics/blob/main/docs/grumpy-reviewer.md)

```sh
# Add the workflow to your repository
gh aw add-wizard githubnext/agentics/grumpy-reviewer

```


### [PR Nitpicker](https://github.com/githubnext/agentics/blob/main/docs/pr-nitpick-reviewer.md)

```sh
# Add the workflow to your repository
gh aw add-wizard githubnext/agentics/pr-nitpick-reviewer

```

## [AI Moderator](https://github.com/githubnext/agentics/blob/main/docs/ai-moderator.md)

```sh

# Add the workflow to your repository
gh aw add-wizard githubnext/agentics/ai-moderator

```


## [Issue Triage](https://github.com/githubnext/agentics/blob/main/docs/issue-triage.md)

```sh

# Add the workflow to your repository
gh aw add-wizard githubnext/agentics/issue-triage

```
## [Dependabot PR Bundler](https://github.com/githubnext/agentics/blob/main/docs/dependabot-pr-bundler.md)

```sh
# Add the workflow to your repository
gh aw add-wizard githubnext/agentics/dependabot-pr-bundler

## [Weekly issue sumary](https://github.com/githubnext/agentics/blob/main/docs/weekly-issue-summary.md)

```sh

# Add the workflow to your repository
gh aw add-wizard githubnext/agentics/weekly-issue-summary

# Run manually 
gh aw run weekly-issue-summary --repo lloydmckie-lang/github-agentic-workflows --engine copilot
```

## [Repo Ask](https://github.com/githubnext/agentics/blob/main/docs/repo-ask.md)


```sh

# Add the workflow to your repository
gh aw add-wizard githubnext/agentics/repo-ask

# Example comment: /repo-ask How does the authentication system work in this project?
```

### [Pr fix](https://github.com/githubnext/agentics/blob/main/docs/pr-fix.md)
```sh
# Add the workflow to your repository
gh aw add-wizard githubnext/agentics/pr-fix

```
