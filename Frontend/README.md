# Frontend (Vite + React + TypeScript)

## Environment

Create a `.env` file in this folder with:

```
VITE_API_BASE_URL=/api
VITE_BACKEND_URL=http://localhost:5000
```

`VITE_API_BASE_URL` is used at runtime in production. In development, the Vite proxy sends `/api/*` requests to `VITE_BACKEND_URL`.

## Scripts

- `npm run dev` – starts Vite dev server at http://localhost:8080
- `npm run build` – builds production assets to `dist/`
- `npm run preview` – serves the build for local preview
