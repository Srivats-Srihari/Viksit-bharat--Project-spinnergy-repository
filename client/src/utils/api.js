// Utility for API calls with base URL from environment
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export async function apiFetch(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.token ? { 'Authorization': `Bearer ${options.token}` } : {}),
    },
    ...options
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'API Error');
  return data;
}