"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/store-hooks";
import { setSearch, setSortDir, setSortField, setPageSize, PageSize, SortDir, SortField } from "@/lib/store/products/products.slice";
import { useDebounce } from "@/hooks/useDebounce";

export default function ProductsControls() {
    const dispatch = useAppDispatch();

    const sortField = useAppSelector((state) => state.products.sortField);
    const sortDir = useAppSelector((state) => state.products.sortDir);
    const pageSize = useAppSelector((state) => state.products.pageSize);
    const currentSearchInStore = useAppSelector((state) => state.products.search);

    // Local input so typing feels instant
    const [searchInput, setSearchInput] = useState(currentSearchInStore);

    // Debounce typing by 300ms
    const debouncedSearch = useDebounce(searchInput, 300);

    // After user stops typing, update Redux
    useEffect(() => {
        dispatch(setSearch(debouncedSearch));
    }, [debouncedSearch, dispatch]);

    return (
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            
            {/* Search */}
            <div className="w-full md:max-w-xs">
                <input
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Search products..."
                className="
                    w-full rounded-md border border-gray-300
                    px-3 py-2 text-sm
                    placeholder:text-gray-400
                    focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500
                "
                />
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3">
                
                {/* Sort field */}
                <select
                value={sortField}
                onChange={(event) =>
                    dispatch(setSortField(event.target.value as SortField))
                }
                className="
                    rounded-md border border-gray-300 bg-white
                    px-3 py-2 text-sm
                    focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500
                "
                >
                <option value="price">Price</option>
                <option value="category">Category</option>
                </select>

                {/* Sort direction */}
                <select
                value={sortDir}
                onChange={(event) =>
                    dispatch(setSortDir(event.target.value as SortDir))
                }
                className="
                    rounded-md border border-gray-300 bg-white
                    px-3 py-2 text-sm
                    focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500
                "
                >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
                </select>

                {/* Page size */}
                <select
                value={pageSize}
                onChange={(event) =>
                    dispatch(setPageSize(Number(event.target.value) as PageSize))
                }
                className="
                    rounded-md border border-gray-300 bg-white
                    px-3 py-2 text-sm
                    focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500
                "
                >
                <option value={5}>5 / page</option>
                <option value={10}>10 / page</option>
                <option value={15}>15 / page</option>
                <option value={20}>20 / page</option>
                </select>
            </div>
            </div>
        </div>
        );
}
