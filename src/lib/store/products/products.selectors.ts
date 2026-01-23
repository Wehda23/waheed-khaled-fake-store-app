import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const selectProductsState = (state: RootState) => state.products;

export const selectProductsView = createSelector(
    [selectProductsState],
    (productsState) => {
        const { items, search, sortField, sortDir, page, pageSize } = productsState;

        let filtered = items;

        // Search
        const query = search.trim().toLowerCase();
        if (query) {
        filtered = filtered.filter((product) =>
            product.title.toLowerCase().includes(query)
        );
        }

        // Sort
        const direction = sortDir === "asc" ? 1 : -1;
        const sorted = [...filtered].sort((a, b) => {
        if (sortField === "price") return (a.price - b.price) * direction;
        return a.category.localeCompare(b.category) * direction;
        });

        // Pagination
        const totalItems = sorted.length;
        const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
        const safePage = Math.min(Math.max(1, page), totalPages);

        const startIndex = (safePage - 1) * pageSize;
        const pagedItems = sorted.slice(startIndex, startIndex + pageSize);

        return {
            items: pagedItems,
            totalItems,
            totalPages,
            page: safePage,
            pageSize,
        };
    }
);
