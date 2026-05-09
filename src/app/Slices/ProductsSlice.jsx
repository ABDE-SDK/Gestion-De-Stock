import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productsData from '../../data/products.json';

let products = [...productsData.products];

export const fetchProducts = createAsyncThunk('products/fetchAll', async (userId, { rejectWithValue }) => {
  try {
    return userId ? products.filter((p) => p.user_id === userId) : products;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const ProductsSlice = createSlice({
  name: 'products',
  initialState: { loading: false, list: [], error: null },
  reducers: {
    addProduct: (state, action) => {
      state.list.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = action.payload.id;
      state.list = state.list.map((p) => (p.id === index ? action.payload : p));
    },
    deleteProduct: (state, action) => {
      state.list = state.list.filter((p) => p.id !== action.payload);
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
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const addProductAsync = createAsyncThunk('products/add', async (req, { rejectWithValue, dispatch }) => {
  try {
    const newProduct = {
      ...req,
      id: products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1,
    };
    products.push(newProduct);
    dispatch(addProduct(newProduct));
    return newProduct;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const removeProductAsync = createAsyncThunk('products/delete', async (productId, { rejectWithValue, dispatch }) => {
  try {
    products = products.filter((p) => p.id !== productId);
    dispatch(deleteProduct(productId));
    return productId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateProductAsync = createAsyncThunk('products/update', async (product, { rejectWithValue, dispatch }) => {
  try {
    products = products.map((p) => (p.id === product.id ? product : p));
    dispatch(updateProduct(product));
    return product;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export default ProductsSlice.reducer;
export const { addProduct, deleteProduct, updateProduct } = ProductsSlice.actions