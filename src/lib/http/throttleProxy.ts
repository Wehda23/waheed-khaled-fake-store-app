import { HttpClient, HttpMethod, HttpRequestConfig, HttpResponse } from "./types";

export class ThrottledHttpClientProxy implements HttpClient {
    private lastCall = new Map<string, number>();

    constructor(
        private inner: HttpClient,
        private intervalMs = 300
    ) {}

    async request<T>(
        method: HttpMethod,
        url: string,
        body?: unknown,
        config?: HttpRequestConfig
    ): Promise<HttpResponse<T>> {
        // Apply throttling only if skipThrottle is not set
        if (!config?.skipThrottle) {
            const key = `${method}:${url}`;
            const now = Date.now();
            const last = this.lastCall.get(key) ?? 0;

            if (now - last < this.intervalMs) {
                throw new Error("Too many requests");
            }
            this.lastCall.set(key, now);
        }

        // Forward the request to the inner HttpClient
        return this.inner.request<T>(method, url, body, config);
    }

    get<T>(url: string, config?: HttpRequestConfig) {
        return this.request<T>("GET", url, undefined, config);
    }

    post<T>(url: string, body?: unknown, config?: HttpRequestConfig) {
        return this.request<T>("POST", url, body, config);
    }

    put<T>(url: string, body?: unknown, config?: HttpRequestConfig) {
        return this.request<T>("PUT", url, body, config);
    }
}
