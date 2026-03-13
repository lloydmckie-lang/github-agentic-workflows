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
