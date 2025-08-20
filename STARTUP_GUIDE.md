# Email Management App - Startup Guide

## The Problem
You're getting "Cannot GET /employee-dashboard" error because the backend is trying to handle frontend routes.

## Solution

### 1. Start the Backend (Terminal 1)
```bash
cd Backend
npm run dev
```
This will start the backend on port 5001 with explicit development settings.

### 2. Start the Frontend (Terminal 2)
```bash
cd Frontend
npm run dev
```
This will start the frontend on port 8080.

### 3. Access the Application
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:5001
- **Employee Dashboard**: http://localhost:8080/employee-dashboard

## Important Notes

1. **Don't access the frontend through the backend port (5000)**
2. **The backend only handles API routes** like `/api/employee/leave-email`
3. **The frontend handles all UI routes** like `/employee-dashboard`
4. **In development, keep both servers running separately**

## API Routes (Backend - Port 5001)
- `/api/auth/*` - Authentication
- `/api/employee/*` - Employee operations
- `/api/admin/*` - Admin operations
- `/api/emails/*` - Email operations

## Frontend Routes (Frontend - Port 8080)
- `/` - Home page
- `/login` - Login page
- `/signup` - Signup page
- `/dashboard` - Admin dashboard
- `/employee-dashboard` - Employee dashboard
- `/profile` - User profile

## Troubleshooting

If you still get routing errors:
1. Make sure you're accessing the frontend on port 8080
2. Check that both servers are running
3. Verify the backend console shows "Starting backend in development mode"
4. Check browser console for any JavaScript errors
