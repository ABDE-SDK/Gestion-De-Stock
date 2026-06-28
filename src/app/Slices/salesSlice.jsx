import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import salesData from "../../data/sales.json";

let sales = [...salesData.sales];

export const fetchSales = createAsyncThunk(
    "sales/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            return sales;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const SalesSlice = createSlice({
    name: "sales",

    initialState: {
        loading: false,
        list: [],
        error: null,
    },

    reducers: {
        addSale: (state, action) => {
            state.list.push(action.payload);
        },

        updateSale: (state, action) => {
            state.list = state.list.map((sale) =>
                sale.id === action.payload.id
                    ? action.payload
                    : sale
            );
        },

        deleteSale: (state, action) => {
            state.list = state.list.filter(
                (sale) => sale.id !== action.payload
            );
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchSales.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchSales.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })

            .addCase(fetchSales.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const addSaleAsync = createAsyncThunk(
    "sales/add",
    async (sale, { rejectWithValue, dispatch }) => {
        try {
            const newSale = {
                ...sale,
                id: sales.length
                    ? Math.max(...sales.map((s) => s.id)) + 1
                    : 1,
            };

            sales.push(newSale);

            dispatch(addSale(newSale));

            return newSale;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateSaleAsync = createAsyncThunk(
    "sales/update",
    async (sale, { rejectWithValue, dispatch }) => {
        try {
            const updatedSales = sales.map((s) =>
                s.id === sale.id ? sale : s
            );

            sales.splice(0, sales.length, ...updatedSales);

            dispatch(updateSale(sale));

            return sale;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const removeSaleAsync = createAsyncThunk(
    "sales/delete",
    async (saleId, { rejectWithValue, dispatch }) => {
        try {
            const updatedSales = sales.filter(
                (s) => s.id !== saleId
            );

            sales.splice(0, sales.length, ...updatedSales);

            dispatch(deleteSale(saleId));

            return saleId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const {
    addSale,
    updateSale,
    deleteSale,
} = SalesSlice.actions;

export default SalesSlice.reducer;