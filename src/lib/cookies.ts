import Cookies from 'js-cookie';

// Cookie names
export const COOKIE_NAMES = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
  REFRESH_TOKEN: 'refreshToken',
} as const;

// Secure cookie options
export const COOKIE_OPTIONS = {
  expires: 7, // 7 days
  secure: process.env.NODE_ENV === 'production', // HTTPS only in production
  sameSite: 'lax' as const, 
  path: '/', // Available throughout app
};

/**
 * Set a secure cookie
 */
export function setSecureCookie(
  name: string,
  value: string,
  options = COOKIE_OPTIONS
): void {
  Cookies.set(name, value, options);
}

/**
 * Get cookie value
 */
export function getCookie(name: string): string | undefined {
  return Cookies.get(name);
}

/**
 * Remove cookie
 */
export function removeCookie(name: string): void {
  Cookies.remove(name, { path: '/' });
}

/**
 * Set authentication token
 */
export function setAuthToken(token: string): void {
  setSecureCookie(COOKIE_NAMES.AUTH_TOKEN, token);
}

/**
 * Get authentication token
 */
export function getAuthToken(): string | undefined {
  return getCookie(COOKIE_NAMES.AUTH_TOKEN);
}

/**
 * Remove authentication token
 */
export function removeAuthToken(): void {
  removeCookie(COOKIE_NAMES.AUTH_TOKEN);
}

/**
 * Set user data
 */
export function setUserData(userData: object): void {
  setSecureCookie(COOKIE_NAMES.USER_DATA, JSON.stringify(userData));
}

/**
 * Get user data
 */
export function getUserData<T = any>(): T | null {
  const data = getCookie(COOKIE_NAMES.USER_DATA);
  if (!data) return null;
  
  try {
    return JSON.parse(data) as T;
  } catch {
    return null;
  }
}

/**
 * Remove user data
 */
export function removeUserData(): void {
  removeCookie(COOKIE_NAMES.USER_DATA);
}

/**
 * Clear all authentication cookies
 */
export function clearAuthCookies(): void {
  removeAuthToken();
  removeUserData();
  removeCookie(COOKIE_NAMES.REFRESH_TOKEN);
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getAuthToken() && !!getUserData();
}
