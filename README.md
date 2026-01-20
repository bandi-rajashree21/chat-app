# Chatty — Realtime Chat App

A small realtime chat application with a Node/Express + Socket.IO backend and a React + Vite frontend (TailwindCSS + DaisyUI).

Tech stack & highlights

- Tech stack: MERN + Socket.io + TailwindCSS + Daisy UI
- Authentication & Authorization with JWT
- Real-time messaging with Socket.io
- Online user status
- Global state management with Zustand
- Error handling both on the server and on the client

---

## Repo layout

- `backend/` — Express + Socket.IO server
  - `src/index.js` — server entry (creates HTTP server & attaches socket.io)
  - `src/lib/socket.js` — socket.io server setup
  - `src/routes/` — API routes
  - `src/controllers/` — route controllers (messages, auth)
  - `src/models/` — Mongoose models
- `frontend/` — React + Vite app
  - `src/` — React source (components, pages, store)
  - `index.html`, `vite.config.js`, `tailwind.config.js`

## Requirements

- Node.js (v16+ recommended)
- npm
- MongoDB connection (Atlas URI or local)
- Cloudinary account (for image uploads)

## Environment variables

Create a `.env` file in `backend/` with at least the following values:

```
MONGODB_URI=your_mongodb_uri
PORT=5001
JWT_SECRET=your_jwt_secret
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

Replace placeholder values with your actual credentials.

## Setup — backend

1. Install dependencies and start the backend (PowerShell):

```powershell
cd backend
npm install
npm run dev
```

`npm run dev` runs `nodemon src/index.js` and will restart on file changes.

2. Verify backend is running on the configured port (default 5001):

```powershell
Test-NetConnection -ComputerName localhost -Port 5001
```

You should see `TcpTestSucceeded : True` if the server is listening.

## Setup — frontend

1. Install and start the frontend (PowerShell):

```powershell
cd frontend
npm install
npm run dev
```

2. Open the printed local URL (e.g., http://localhost:5173) in the browser.

## Contributing

Thanks for your interest in contributing to Chatty! To keep collaboration smooth, please follow these guidelines:

- Fork the repo and create a feature branch from `main`:
  ```bash
  git checkout -b feature/your-short-description
  ```
- Write clear, focused commits and include tests for new behavior when practical.
- Keep code style consistent with the project (ESLint for JS/React). Run `npm run lint` in each package before submitting.
- Open a Pull Request against `main` with a description of the change, motivation, and any manual testing steps.
- For breaking changes or API changes, include migration notes in the PR description and update the README.

Maintainers will review PRs, request changes where necessary, and merge when ready. Thanks — your contributions make this project better!
