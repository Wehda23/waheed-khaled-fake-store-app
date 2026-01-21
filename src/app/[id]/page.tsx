import { Product } from "@/types/product.types";
import type { Metadata } from "next";
import ProductDetails from "./components/product-details";



async function getProduct(id: string): Promise<Product> {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        next: { revalidate: 60 * 60 },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch product");
    }

    return response.json();
}

export async function generateMetadata(
  props: { params: Promise<{ id: string }> }
): Promise<Metadata> {
    const { id } = await props.params;

    const product = await getProduct(id);

    const title = `${product.title} | FakeStore`;
    const description =
        product.description.length > 150
        ? product.description.slice(0, 147) + "..."
        : product.description;

    return {
        title,
        description,
        openGraph: {
        title,
        description,
        images: [{ url: product.image }],
        type: "website",
        },
    };
}

export default async function ProductPage(
  props: { params: Promise<{ id: string }> }
) {
    const { id } = await props.params;
    const product = await getProduct(id);

    return (
        <main className="mx-auto w-full max-w-6xl px-4 py-6">
            <ProductDetails product={product} />
        </main>
    );
}
