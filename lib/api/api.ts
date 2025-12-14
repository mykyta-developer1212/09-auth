import axios from 'axios';

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  });