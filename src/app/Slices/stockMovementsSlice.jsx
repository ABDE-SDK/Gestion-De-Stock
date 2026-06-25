import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import stockMovementsData from '../../data/stockMovements.json';

let stockMovements = [...stockMovementsData.stockMovements];

const getNextId = (items) => (items.length ? Math.max(...items.map((item) => item.id)) + 1 : 1);

export const fetchStockMovements = createAsyncThunk('stockMovements/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return stockMovements;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addStockMovementAsync = createAsyncThunk('stockMovements/add', async (movementPayload, { dispatch, rejectWithValue }) => {
  try {
    const newMovement = { ...movementPayload, id: getNextId(stockMovements) };
    stockMovements = [newMovement, ...stockMovements];
    dispatch(addStockMovement(newMovement));
    return newMovement;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const stockMovementsSlice = createSlice({
  name: 'stockMovements',
  initialState: { loading: false, list: [], error: null },
  reducers: {
    addStockMovement: (state, action) => {
      state.list.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockMovements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStockMovements.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchStockMovements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addStockMovementAsync.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      });
  },
});

export const { addStockMovement } = stockMovementsSlice.actions;
export default stockMovementsSlice.reducer;