"use client";

import { selectProductsView } from "@/lib/store/products/products.selectors";
import { setPage } from "@/lib/store/products/products.slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/store-hooks";

export function PaginationControls() {
    const dispatch = useAppDispatch();
    const { page, totalPages, totalItems } = useAppSelector(selectProductsView);

    // Nothing to paginate
    if (totalPages <= 1) return null;

    return (
        <div className="mt-6 flex items-center justify-center gap-4">
        {/* Prev */}
        {page > 1 && (
            <button
            onClick={() => dispatch(setPage(page - 1))}
            className="
                rounded-md border border-gray-300 bg-white
                px-3 py-2 text-sm font-medium text-gray-700
                transition
                hover:bg-gray-50 hover:text-gray-900
                active:scale-[0.97]
            "
            >
            Prev
            </button>
        )}

        {/* Page info */}
        <span className="text-sm text-gray-600">
            Page <span className="font-medium text-gray-900">{page}</span> of{" "}
            <span className="font-medium text-gray-900">{totalPages}</span>
            <span className="ml-1 text-gray-400">({totalItems} items)</span>
        </span>

        {/* Next */}
        {page < totalPages && (
            <button
            onClick={() => dispatch(setPage(page + 1))}
            className="
                rounded-md border border-gray-300 bg-white
                px-3 py-2 text-sm font-medium text-gray-700
                transition
                hover:bg-gray-50 hover:text-gray-900
                active:scale-[0.97]
            "
            >
            Next
            </button>
        )}
        </div>
    );
}
