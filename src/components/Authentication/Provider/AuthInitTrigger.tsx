/**
 * This function is going to initiate the checking for auth
 */

"use client";

import { useEffect } from "react";
import { useAuth } from "./AuthProvider";

export default function AuthInitTrigger() {
  const { initializing, setAuthFromStorage } = useAuth();

  useEffect(() => {
    // Trigger init once when app mounts
    if (initializing) setAuthFromStorage();
  }, [initializing, setAuthFromStorage]);

  return null; // no UI, just triggers
}