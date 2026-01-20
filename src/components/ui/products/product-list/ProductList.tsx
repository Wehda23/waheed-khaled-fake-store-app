"use client";

import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { PaginationControls } from "./PaginationControls";
import ProductsControls from "./ProductsControl";
import ProductsDisplay from "./ProductsDisplay";
import { useAppDispatch, useAppSelector } from "@/lib/store/store-hooks";
import { fetchProducts } from "@/lib/store/products/products.slice";

const ProductList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { error } = useAppSelector((state) => state.products);


    // Initial fetch
    useEffect(() => {
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

            <h1 className="text-3xl font-semibold text-[#1F4FD8]">Products</h1>

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
