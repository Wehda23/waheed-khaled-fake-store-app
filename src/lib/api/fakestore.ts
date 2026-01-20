import type { HttpClient } from "@/lib/http/types";
import type { HttpRequestConfig } from "@/lib/http/types";
import { Product } from "@/types/product.types";

export type NewProduct = Omit<Product, "id">;


export class FakeStoreApi {
    constructor(private http: HttpClient) {}

    // (Required)
    // Grab Products
    getProducts(config?: HttpRequestConfig) {
        return this.http.get<Product[]>("/products", config);
    }

    // Create Products
    createProduct(product: NewProduct) {
        return this.http.post<Product>("/products", product);
    }


    // (Optional)
    // Handle login
    login(username: string, password: string, config?: HttpRequestConfig) {
        return this.http.post<{ token: string }>("/auth/login", { username, password }, config);
    }

    // Add methods for cart if time allows it.
}