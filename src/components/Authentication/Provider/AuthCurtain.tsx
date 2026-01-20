/**
 * This one is used for entire pages (Auth Dependend Pages) or small components on public pages as watchers.
 * (Example Usage)
 *
 *  <AuthCurtain>
 *     <ProtectedContent />
 *  </AuthCurtain>
 *  <AuthCurtain fallback={<div>Checking auth…</div>}>
 *     <ProtectedContent />
 *  </AuthCurtain>
 *
 *  It will show loading fallback until auth is initialized (checking token from storage)
 * Once initialized it will show children.
 * If you need to protect entire pages based on auth state consider using AuthProvider at app level and use AuthInitTrigger to initialize auth on app load.
 * Then use AuthCurtain to wrap protected components or pages to avoid showing content until auth is initialized.
 * This way you can avoid slow loading of entire app by wrapping AuthProvider at app level.
 * Instead you can wrap only protected components/pages with AuthCurtain to ensure auth is ready before rendering them.
 * This component relies on useAuth from AuthProvider to get the auth state.
 * If auth is still initializing, it renders the fallback UI (if provided) or a default loading indicator.
 * Once initialization is complete, it renders the children components.
 */
"use client";

import DefaultLoading from "@/app/loading";
import { useAuth } from "./AuthProvider";

type Props = {
    children: React.ReactNode;
    fallback?: React.ReactNode;
};

export default function AuthCurtain({
    children,
    fallback,
}: Props) {
    const { initializing } = useAuth();

    if (initializing) {
        return <>{fallback ?? <DefaultLoading />}</>;
    }

    return <>{children}</>;
}

