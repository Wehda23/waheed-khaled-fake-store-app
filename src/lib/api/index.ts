/**
 * API Entry Point
 * This module initializes and exports the API client for interacting with the Fake Store API.
 * It sets up the HTTP client with necessary configurations like base URL, throttling, and authentication.
 * The exported `api` object can be used throughout the application to make API calls.
 * The Fake Store API is a free online REST API that you can use for testing and prototyping e-commerce applications.
 * Base URL: https://fakestoreapi.com
 * Documentation: https://fakestoreapi.com/docs
 * This setup uses Axios as the core HTTP client, wrapped with throttling and authentication proxies.
 * The token provider retrieves the authentication token from local storage, if available.
 * The `FakeStoreApi` class provides methods to interact with the Fake Store API endpoints.
 * This modular approach allows for easy swapping of the core HTTP client or adding additional middleware in the future.
 * Usage:
 * import { api } from "@/lib/api";
 * api.getProducts().then(products => console.log(products));
 * api.login('username', 'password').then(response => console.log(response.token));
 * to avoid throttle simply add this option to method api.login("username", "password", { skipThrottle: true });
 * This file serves as the central hub for API interactions in the application.
 * Feel free to extend the `FakeStoreApi` class with more methods as needed.
 * Additional Thoughts:
 * 1) I hope this good enough for me to reuse in other projects as i can see a way to use this in microservices CRM, Inventory, HR systems
 * 2) Most likely if communicating with different backends we can create new files with new declarations of coreClient(Axios, Fetch) & FakeStoreAPI.. (HRStoreAPI, InventoryStoreAPI...)
 * 3) We may consider the building layers between coreClient & API to be middlewares that can be included/execluded from any API client.
*/

import { AxiosHttpClient } from "@/lib/http/axiosClient";
import { HttpClientProxy } from "@/lib/http/proxyClient";
import { ThrottledHttpClientProxy } from "@/lib/http/throttleProxy";
import { FakeStoreApi } from "./fakestore";

const BASE_URL = "https://fakestoreapi.com";

const tokenProvider = {
  getToken: () => (typeof window === "undefined" ? null : localStorage.getItem("token")),
  clearToken: () => {
    if (typeof window !== "undefined") localStorage.removeItem("token");
  },
};

// Base Layer
// core transport (swap axios/fetch here)
const coreClient = new AxiosHttpClient(BASE_URL);

// Throttling layer / Control Layer
// add throttling
const throttled = new ThrottledHttpClientProxy(coreClient, 300);

// Adding authentication and Error handling layer.
// add auth + error handling
const http = new HttpClientProxy(throttled, tokenProvider);

export const api = new FakeStoreApi(http);
