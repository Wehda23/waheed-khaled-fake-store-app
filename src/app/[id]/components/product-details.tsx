"use client";

import { Product } from "@/types/product.types";
import Link from "next/link";



export default function ProductDetails({ product }: { product: Product }) {
    return (
        <section className="grid gap-8 md:grid-cols-2">
            {/* LEFT: Image */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                    {product.category}
                </span>

                <Link
                    href="/"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                    title="Back to products"
                    aria-label="Back to products"
                >
                    Back to products
                </Link>
                </div>

                <div className="mt-4 flex h-105 items-center justify-center rounded-lg bg-gray-50 p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-contain"
                    loading="lazy"
                />
                </div>
            </div>

            {/* RIGHT: Info */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-semibold text-gray-900">{product.title}</h1>

                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-600">
                <span className="font-medium text-gray-900">
                    ★ {product.rating?.rate ?? "—"}
                </span>
                <span className="text-gray-300">•</span>
                <span>{product.rating?.count ?? 0} reviews</span>
                </div>

                <div className="mt-4 text-3xl font-bold text-gray-900">${product.price}</div>

                <div className="mt-5 border-t border-gray-200 pt-5">
                <h2 className="text-sm font-semibold text-gray-900">Description</h2>
                <p className="mt-2 text-sm leading-6 text-gray-700">{product.description}</p>
                </div>

                {/* Actions */}
                <div className="mt-6 grid gap-3">
                    <button
                        type="button"
                        className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => {
                        // later: dispatch(addToCart(product))
                        }}
                        disabled={true}
                    >
                        Add to cart
                    </button>

                    <button
                        type="button"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => {
                        // later: "Buy now" flow
                        }}
                        disabled={true}
                    >
                        Buy now
                    </button>
                </div>

                <div className="mt-6 grid gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm">
                <div className="flex items-center justify-between">
                    <span className="text-gray-600">Product ID</span>
                    <span className="font-medium text-gray-900">#{product.id}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium text-gray-900">{product.category}</span>
                </div>
                </div>
            </div>
        </section>
    );
}
