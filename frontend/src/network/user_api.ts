import { UserI } from '../models/user';
import { fetchData } from './notes_api';

export async function getLoggedInUser(): Promise<UserI> {
  const response = await fetchData('/api/users', {
    // match with 'getAuthenticatedUser' in backend/src/routes/users.ts
    method: 'GET',
  });
  return response.json();
}

export interface SignUpRequestBody {
  username: string;
  email: string;
  password: string;
}

export async function signUp(user: SignUpRequestBody): Promise<UserI> {
  const response = await fetchData('/api/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
}

export interface LoginRequestBody {
  username: string;
  password: string;
}

export async function login(user: LoginRequestBody): Promise<UserI> {
  const response = await fetchData('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
}

export async function logout() {
  await fetchData('/api/users/logout', {
    method: 'POST',
  });
}
