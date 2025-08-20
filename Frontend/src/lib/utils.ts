import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// API base URL helper
// In development, calls go through Vite proxy using /api prefix.
// In production, VITE_API_BASE_URL should point to the backend URL (or empty to use same origin with /api prefix).
export const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || '/api';
