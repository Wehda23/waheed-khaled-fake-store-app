"use client";

import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { PaginationControls } from "./PaginationControls";
import ProductsControls from "./ProductsControl";
import ProductsDisplay from "./ProductsDisplay";
import { useAppDispatch, useAppSelector } from "@/lib/store/store-hooks";
import { fetchProducts } from "@/lib/store/products/products.slice";
import Link from "next/link";

const ProductList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { error } = useAppSelector((state) => state.products);

    const fetchedRef = useRef(false);
    // Initial fetch
    useEffect(() => {
        // Guarding it to avoid running twice on strict mode;
        if (fetchedRef.current) return;
        fetchedRef.current = true;

        console.log("Fetching products...");
        dispatch(fetchProducts());

    }, [dispatch]);

    // Error handling
    useEffect(() => {
        if (error) {
            toast.error(`Error loading products: ${error}`);
        }
    }, [error]);


    return (
        <section className="grid w-full max-w-6xl gap-4">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-semibold text-[#1F4FD8]">Products</h1>

                {/* Go to create product */}
                <Link
                    href="/create-product"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                    Create new product
                </Link>
            </div>
            <ProductsControls />

            {!error && (
                <>
                    <ProductsDisplay />
                    <PaginationControls />
                </>
            )}

            {error && (
                <button
                onClick={() => dispatch(fetchProducts())}
                className="w-fit rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                Try again now
                </button>
            )}
        </section>
    );
};

export default ProductList;
