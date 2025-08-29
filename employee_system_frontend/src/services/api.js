/**
 * PUBLIC_INTERFACE
 * API client using axios with mock fallbacks.
 * Set REACT_APP_API_BASE in .env to point to backend.
 */
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// PUBLIC_INTERFACE
export async function apiGet(path, fallback) {
  try {
    const { data } = await api.get(path);
    return data;
  } catch (e) {
    if (fallback !== undefined) return fallback;
    throw e;
  }
}

// PUBLIC_INTERFACE
export async function apiPost(path, body, fallback) {
  try {
    const { data } = await api.post(path, body);
    return data;
  } catch (e) {
    if (fallback !== undefined) return fallback;
    throw e;
  }
}

// PUBLIC_INTERFACE
export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

export default api;
