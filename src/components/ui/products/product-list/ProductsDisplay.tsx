"use client";

import { useAppSelector } from "@/lib/store/store-hooks";
import { selectProductsView } from "@/lib/store/products/products.selectors";
import ProductCard from "../product-card/ProductCard";
import ProductCardSkeleton from "../product-card/ProductCardSkeleton";


export default function ProductsDisplay() {
    const {items, pageSize} = useAppSelector(selectProductsView);
    const { loading, hasFetched, error } = useAppSelector((state) => state.products);
    const showEmptyState = hasFetched && !loading && !error && items.length === 0;

    const getSkeletonCount = (pageSize: number): number => {
        switch (pageSize) {
            case 10:
                return 8;
            case 15:
                return 12;
            case 20:
                return 16;
            default:
                return 4; // Default fallback
        }
    };

    return (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {loading && (
                Array.from({ length: getSkeletonCount(pageSize) }).map((_, index) => (
                <ProductCardSkeleton key={index} />)
            ))}

            {showEmptyState && (
                <p>No Products</p>
            )}

            {items.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
