/**
 * Axios HTTP Client Implementation
 * This module provides an implementation of the HttpClient interface using Axios.
 * Choosing Axios because it has a lot of things already configured rather than using fetch directly.
 */

import axios, { AxiosInstance } from "axios";
import type { HttpClient, HttpMethod, HttpRequestConfig, HttpResponse } from "./types";

export class AxiosHttpClient implements HttpClient {
    private instance: AxiosInstance;

    constructor(baseURL?: string, defaultHeaders?: Record<string, string>) {
        this.instance = axios.create({
            baseURL,
            headers: defaultHeaders,
        });
    }

    async request<T>(method: HttpMethod, url: string, body?: unknown, config?: HttpRequestConfig): Promise<HttpResponse<T>> {

        const res = await this.instance.request<T>({
            method,
            url: url,
            data: body,
            headers: config?.headers,
        });

        return {
            status: res.status,
            data: res.data,
            headers: res.headers as Record<string, string>,
        };
    }

    get<T>(url: string, config?: HttpRequestConfig) { return this.request<T>("GET", url, undefined, config); }
    post<T>(url: string, body?: unknown, config?: HttpRequestConfig) { return this.request<T>("POST", url, body, config); }
    put<T>(url: string, body?: unknown, config?: HttpRequestConfig) { return this.request<T>("PUT", url, body, config); }
}