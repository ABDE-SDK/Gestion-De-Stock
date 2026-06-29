import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import suppliersData from '../../data/suppliers.json';

let suppliers = [...suppliersData.suppliers];

export const fetchSuppliers = createAsyncThunk('suppliers/fetchAll', async ( _,{ rejectWithValue }) => {
  try {
    return suppliers;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const suppliersSlice = createSlice({
  name: 'suppliers',
  initialState: { loading: false, list: [], error: '' },
  reducers: {
    addSupplier: (state, action) => {
      state.list.push(action.payload);
    },
    updateSupplier: (state, action) => {
      const index = state.list.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = {
          ...state.list[index],
          ...action.payload,
        };
      }
    },
    removeSupplier: (state, action) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuppliers.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { addSupplier, updateSupplier, removeSupplier } = suppliersSlice.actions;

export const createSupplierAsync = createAsyncThunk('suppliers/create', async (supplier, { rejectWithValue, dispatch }) => {
  try {
    const newSupplier = {
      ...supplier,
      id: suppliers.length ? Math.max(...suppliers.map((s) => s.id)) + 1 : 1,
    };
    suppliers.push(newSupplier);
    dispatch(addSupplier(newSupplier));
    return newSupplier;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateSupplierAsync = createAsyncThunk('suppliers/update', async (supplier, { rejectWithValue, dispatch }) => {
  try {
    const updatedSuppliers = suppliers.map((s) => (s.id === supplier.id ? { ...s, ...supplier } : s));
    suppliers.splice(0, suppliers.length, ...updatedSuppliers);
    const merged = updatedSuppliers.find((s) => s.id === supplier.id) || supplier;
    dispatch(updateSupplier(merged));
    return merged;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteSupplierAsync = createAsyncThunk('suppliers/delete', async (supplierId, { rejectWithValue, dispatch }) => {
  try {
    const updatedSuppliers = suppliers.filter((s) => s.id !== supplierId);
    suppliers.splice(0, suppliers.length, ...updatedSuppliers);
    dispatch(removeSupplier(supplierId));
    return supplierId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export default suppliersSlice.reducer;