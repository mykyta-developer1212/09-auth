import axios from 'axios';

const baseURL =
  process.env.NEXT_PUBLIC_API_URL === 'http://localhost:3000'
    ? 'https://notehub-api.goit.study' 
    : process.env.NEXT_PUBLIC_API_URL;

if (!baseURL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined in .env');
}

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});