"use client";

import { useState } from "react";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { api } from "@/lib/api";
import { newProductSchema, NewProductFormValues } from "@/lib/validation/product.schema";
import { getErrorMessage } from "@/lib/http/errors";
import Link from "next/link";

export default function CreateProductForm() {
    const [submitting, setSubmitting] = useState(false);

    const form = useForm<NewProductFormValues>({
        resolver: zodResolver(newProductSchema) as unknown as Resolver<NewProductFormValues>,
            defaultValues: {
            title: "",
            price: 0,
            description: "",
            image: "",
            category: "",
        },
        mode: "onTouched",
    });

    const onSubmit: SubmitHandler<NewProductFormValues>  = async (values: NewProductFormValues) => {
        setSubmitting(true);

        try {
            await api.createProduct(values);
            toast.success("Product created successfully!");
            form.reset();
        } catch (error: unknown) {
            const message = getErrorMessage(error)
            toast.error(message);
        } finally {
            setSubmitting(false);
        }
    };

    const fieldError = (name: keyof NewProductFormValues) =>
        form.formState.errors[name]?.message;

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto w-full max-w-3xl rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
        >
            <h1 className="text-2xl font-semibold text-indigo-600">Create product</h1>
            <p className="mt-1 text-sm text-gray-600">
                Fill the details below. This uses FakeStore API (demo backend).
            </p>

            <div className="mt-6 grid gap-4">
                {/* Title */}
                <div>
                <label className="mb-1 block text-sm font-medium text-gray-800">Title</label>
                <input
                    {...form.register("title")}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="e.g. Classic Cotton T-Shirt"
                />
                {fieldError("title") && <p className="mt-1 text-xs text-red-600">{fieldError("title")}</p>}
                </div>

                {/* Price + Category */}
                <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-800">Price</label>
                    <input
                    type="text"
                    step="0.01"
                    {...form.register("price", { valueAsNumber: true })}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="e.g. 39.99"
                    />
                    {fieldError("price") && <p className="mt-1 text-xs text-red-600">{fieldError("price")}</p>}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-800">Category</label>
                    <input
                    {...form.register("category")}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="e.g. men's clothing"
                    />
                    {fieldError("category") && <p className="mt-1 text-xs text-red-600">{fieldError("category")}</p>}
                </div>
                </div>

                {/* Image */}
                <div>
                <label className="mb-1 block text-sm font-medium text-gray-800">Image URL</label>
                <input
                    {...form.register("image")}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="https://..."
                />
                {fieldError("image") && <p className="mt-1 text-xs text-red-600">{fieldError("image")}</p>}
                </div>

                {/* Description */}
                <div>
                <label className="mb-1 block text-sm font-medium text-gray-800">Description</label>
                <textarea
                    rows={5}
                    {...form.register("description")}
                    className="w-full resize-y rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="Write a short product description..."
                />
                {fieldError("description") && (
                    <p className="mt-1 text-xs text-red-600">{fieldError("description")}</p>
                )}
                </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex justify-between flex-col-reverse gap-4 sm:flex-row sm:items-center">
                <Link
                    href={"/"}
                    aria-label="Go back home"
                    title="Go back home"
                    className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200 text-center"
                    // While submitting we need make this not clickable
                    onClick={(e) => {
                        if (submitting)
                            e.preventDefault();
                    }}
                    >
                    Go back home
                </Link>
                <div className="flex gap-3 sm:justify-end">
                    <button
                        type="button"
                        onClick={() => form.reset()}
                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
                        disabled={submitting}
                    >
                        Reset
                    </button>

                    <button
                        type="submit"
                        className="rounded-lg w-full md:w-fit bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
                        disabled={submitting}
                    >
                        {submitting ? "Creating..." : "Create product"}
                    </button>
                </div>
            </div>
        </form>
    );
}
