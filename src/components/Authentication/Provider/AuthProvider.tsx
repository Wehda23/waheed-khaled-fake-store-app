/**
 * Authentication Provider
 * This component provides authentication context to its children components.
 * It manages the authentication state, including login, logout, and token storage.
 * The authentication state is shared across the application using React Context.
 * Let know that this gets the authentication from cookies/localstorage no api call is included.
 *      - The point is that it will initialize on entire app upon loading the web application
 *      - If there were any <API> call to grab user from server etc.. will will not wrap it on entire app to avoid slow website loading
 *          and will need to create AuthCurtain around components who use it individually or maybe protected/Auth/Guest Routes Guards to avoid slow website and maintain functionality.
*/
"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

import { api } from "@/lib/api"; // your FakeStoreApi instance
import { tokenStore } from "@/lib/auth/storage";

type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  initializing: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  setAuthFromStorage: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null); 
  const [initializing, setInitializing] = useState(true); // to track initialization for loading states

  // Load token from storage on initialization
  function setAuthFromStorage() {
    const token = tokenStore.get();
    setToken(token);
    setInitializing(false);
  }

  // Login function
  async function login(username: string, password: string) {
    const res = await api.login(username, password, { skipThrottle: true });
    tokenStore.set(res.data.token);
    setToken(res.data.token);
  }

  // Logout function
  function logout() {
    tokenStore.clear();
    setToken(null);
  }

  // Memoize the context value to optimize performance unliked useCallback for functions
  const value = useMemo<AuthState>(
    () => ({
      token,
      isAuthenticated: !!token,
      initializing,
      login,
      logout,
      setAuthFromStorage,
    }),
    [token, initializing]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
