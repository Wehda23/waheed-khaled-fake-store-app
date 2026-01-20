import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "@/lib/api";
import { Product } from "@/types/product.types";
import { getErrorMessage } from "../../http/errors";


export type SortField = "price" | "category";
export type SortDir = "asc" | "desc";
export type PageSize = 5 | 10 | 15 | 20;

type ProductsState = {
    items: Product[];
    loading: boolean;
    error: string | null;
    hasFetched: boolean;

    // Applying search & Filter fields
    search: string;
    sortField: SortField;
    sortDir: SortDir;

    // Pagination
    page: number;
    pageSize: PageSize;
};

const initialState: ProductsState = {
    items: [],
    loading: false,
    error: null,
    hasFetched: false,

    search: "",
    sortField: "price",
    sortDir: "asc",

    page: 1,
    pageSize: 10,
};

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.getProducts();
            return res.data;
        } catch (error: unknown) {
            return rejectWithValue(getErrorMessage(error));
        }
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
        },
        setSortField(state, action: PayloadAction<SortField>) {
            state.sortField = action.payload;
        },
        setSortDir(state, action: PayloadAction<SortDir>) {
            state.sortDir = action.payload;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setPageSize(state, action: PayloadAction<PageSize>) {
            state.pageSize = action.payload;
            state.page = 1; // need this if page changes reset pagination
        },
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
            state.hasFetched = true;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = String(action.payload ?? "Failed to fetch products");
            state.hasFetched = true;
        });
    },
});

export const { setSearch, setSortField, setSortDir, setPage, setPageSize} = productsSlice.actions;
export default productsSlice.reducer;
