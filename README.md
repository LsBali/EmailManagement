# EmailManagement (MERN)

## Run locally (Dev)

1) Backend

- Copy `Backend/.env.example` to `Backend/.env` and fill values.
- Install deps and start server:

```
cd Backend
npm i
npm start
```

2) Frontend

- Create `Frontend/.env` with:

```
VITE_API_BASE_URL=/api
VITE_BACKEND_URL=http://localhost:5000
```

- Install deps and start dev server:

```
cd Frontend
npm i
npm run dev
```

Frontend runs on http://localhost:8080 and proxies `/api/*` and `/uploads/*` to the backend.

## Production build and serve via backend

1) Build frontend:

```
cd Frontend
npm run build
```

2) Ensure `NODE_ENV=production` and start backend from `Backend/`. The Express app serves static files from `Frontend/dist` automatically in production:

```
cd Backend
NODE_ENV=production npm start
```

## API base URL

- Dev: Use `/api` from the frontend; Vite proxy sends to `VITE_BACKEND_URL`.
- Prod: Set `VITE_API_BASE_URL` to your backend URL or keep `/api` when served from the same origin.