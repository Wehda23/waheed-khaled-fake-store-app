/**
 * Token Storage Module
 * This module provides functions to get, set, and clear authentication tokens
 * using either LocalStorage or Cookies.
 */

// Key used for storing the token
const KEY = "token";

// LocalStorage
export function getTokenLS(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(KEY);
}
export function setTokenLS(token: string) {
    localStorage.setItem(KEY, token);
}
// Clear token from LocalStorage logout..
export function clearTokenLS() {
    localStorage.removeItem(KEY);
}

// Cookie (optional, NOT httpOnly)
export function getTokenCookie(): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp(`(?:^|; )${KEY}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}
export function setTokenCookie(token: string) {
  document.cookie = `${KEY}=${encodeURIComponent(token)}; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax`;
}
export function clearTokenCookie() {
  document.cookie = `${KEY}=; path=/; max-age=0; samesite=lax`;
}

/**
 * Picking ONE strategy:
 * - LocalStorage only (recommended for FakeStore)
 * - Cookie only (Will review this later.)
 */
export const tokenStore = {
  get: getTokenLS,         // swap to getTokenCookie if you want
  set: setTokenLS,         // swap to setTokenCookie
  clear: clearTokenLS,     // swap to clearTokenCookie
};
