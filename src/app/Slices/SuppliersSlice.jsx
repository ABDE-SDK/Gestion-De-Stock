import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axiosConfig';
const initialState = {
  loading: false,
  list: [],
  error: '',
};

export const fetchSuppliers = createAsyncThunk(
  'suppliers/fetchAll',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/suppliers',{params:{
        user_id: userId
      }});
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

const suppliersSlice = createSlice({
  name: 'suppliers',
  initialState,
  reducers: {
    addSupplier: (state, action) => {
      state.list.push(action.payload);
    },
    updateSupplier: (state, action) => {
      const index = state.suppliers.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = {
          ...state.list[index],
          ...action.payload,
        };
      }
    },
    removeSupplier: (state, action) => {
      state.suppliers = state.list.filter((item) => item.id !== action.payload);
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
        state.suppliers = action.payload;
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { addSupplier, updateSupplier, removeSupplier } = suppliersSlice.actions;

// CRUD methods using axiosInstance in this slice file
export const createSupplierAsync = (supplier) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/suppliers', supplier);
    dispatch(addSupplier(response.data));
    return response.data;
  } catch (error) {
    throw error?.response?.data?.message || error.message;
  }
};

export const updateSupplierAsync = (supplier) => async (dispatch) => {
  try {
    const response = await axiosInstance.put(`/suppliers/${supplier.id}`, supplier);
    dispatch(updateSupplier(response.data));
    return response.data;
  } catch (error) {
    throw error?.response?.data?.message || error.message;
  }
};

export const deleteSupplierAsync = (supplierId) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/suppliers/${supplierId}`);
    dispatch(removeSupplier(supplierId));
  } catch (error) {
    throw error?.response?.data?.message || error.message;
  }
};

export default suppliersSlice.reducer;