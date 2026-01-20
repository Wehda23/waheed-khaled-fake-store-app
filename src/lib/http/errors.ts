/**
 * API Error Class and Utility Functions
 * This module defines a custom error class for API-related errors and includes utility functions.
 */

export class ApiError extends Error {
    status?: number;
    data?: unknown;
    url?: string;
    method?: string;

    constructor(message: string, options?: { status?: number; data?: unknown; url?: string; method?: string }) {
        super(message);
        this.name = "ApiError";
        this.status = options?.status;
        this.data = options?.data;
        this.url = options?.url;
        this.method = options?.method;
    }
}

export function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === "AbortError";
}

export function getStatusCode(err: unknown): number | undefined {
    if (err instanceof ApiError) return err.status;


    if (typeof err === "object" && err !== null) {
        const anyErr = err as unknown & { status?: number; response?: { status?: number } };
        const s1 = anyErr.status;
        if (typeof s1 === "number") return s1;

        const s2 = anyErr.response?.status;
        if (typeof s2 === "number") return s2;
    }
    return undefined;
}

export function getErrorMessage(err: unknown): string {
    if (typeof err === "string") return err;
    if (err instanceof Error) return err.message;

    if (typeof err === "object" && err !== null) {
        const anyErr = err as unknown & { response?: { data?: { message?: string } }; message?: string };

        // axios-style: err.response.data.message
        const msg1 = anyErr.response?.data?.message;
        if (typeof msg1 === "string") return msg1;

        // generic: err.message
        const msg2 = anyErr.message;
        if (typeof msg2 === "string") return msg2;
    }

    return "Failed to fetch products";
}
