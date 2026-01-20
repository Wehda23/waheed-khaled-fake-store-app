import type { HttpClient, HttpMethod, HttpRequestConfig, HttpResponse } from "./types";
import { getStatusCode } from "./errors";

export type TokenProvider = {
    getToken(): string | null;
    clearToken?: () => void;
};

export class HttpClientProxy implements HttpClient {
    constructor(private inner: HttpClient, private tokenProvider?: TokenProvider) {}

    async request<T>(
        method: HttpMethod,
        url: string,
        body?: unknown,
        config?: HttpRequestConfig
    ): Promise<HttpResponse<T>> {
        const headers = { ...(config?.headers ?? {}) };

        const token = this.tokenProvider?.getToken();
        if (token) headers["Authorization"] = `Bearer ${token}`;

        try {
        return await this.inner.request<T>(method, url, body, { ...config, headers });
        } catch (error: unknown) {
        const status = getStatusCode(error);

        if (status === 401) {
            this.tokenProvider?.clearToken?.();
        }

        throw error;
        }
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
