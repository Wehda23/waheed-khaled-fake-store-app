/*
* Type definitions for HTTP-related functionalities
* This file will include the definition of http methods, http configuration, http response, HTTP client
*/

export type HttpMethod = 'GET' | 'POST' | 'PUT' /* | 'DELETE' */;

export type HttpRequestConfig = {
    headers?: Record<string, string>;
    params?: Record<string, string | number | boolean | undefined>;
}

export type  HttpResponse<T> = {
    status: number;
    data: T;
    headers?: Record<string, string>;
}

/**
 * As per task requirement we are going to use only the following:-
 * 1) <GET> method to retrieve data <Required> (products, product details by id) <Optional>(Cart items)
 * 2) <POST> method to create a new instance <Required>(Create new product) <Optional>(Add to cart, Login Functionality)
 * 3) <PUT> method to update an existing instance (Update cart by adding items or removing items)
 * 4) <Delete> There is no delete functionality <Required> or <Optional> Exist within the task.
 */
export interface HttpClient {
    request<T>(method: HttpMethod, url: string, config?: HttpRequestConfig, body?: unknown): Promise<HttpResponse<T>>;

    // Retrieving data
    get<T>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>>;
    // Post is for creating a new instance.., Put is for updating an existing instance.
    post<T>(url: string, body?: unknown, config?: HttpRequestConfig): Promise<HttpResponse<T>>;
    put<T>(url: string, body?: unknown, config?: HttpRequestConfig): Promise<HttpResponse<T>>;
}
