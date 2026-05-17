import { cookies } from 'next/headers';

export function isAuthenticated(): boolean {
  const cookieStore = cookies();
  const authCookie = cookieStore.get('auth');
  return authCookie?.value === 'authenticated';
}

export function checkAuth(): boolean {
  return isAuthenticated();
}
