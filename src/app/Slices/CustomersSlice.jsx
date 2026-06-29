import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customersData from "../../data/customers.json";

let customers = [...customersData.customers];

export const fetchCustomers = createAsyncThunk(
  "customers/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return customers;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addCustomerAsync = createAsyncThunk(
  "customers/add",
  async (customer, { rejectWithValue, dispatch }) => {
    try {
      const newCustomer = {
        ...customer,
        id: customers.length
          ? Math.max(...customers.map(c => c.id)) + 1
          : 1,
      };

      customers.push(newCustomer);

      dispatch(addCustomer(newCustomer));

      return newCustomer;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCustomerAsync = createAsyncThunk(
  "customers/update",
  async (customer, { rejectWithValue, dispatch }) => {
    try {
      const updatedCustomers = customers.map(c =>
        c.id === customer.id ? customer : c
      );

      customers.splice(
        0,
        customers.length,
        ...updatedCustomers
      );

      dispatch(updateCustomer(customer));

      return customer;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeCustomerAsync = createAsyncThunk(
  "customers/delete",
  async (customerId, { rejectWithValue, dispatch }) => {
    try {
      const updatedCustomers = customers.filter(
        c => c.id !== customerId
      );

      customers.splice(
        0,
        customers.length,
        ...updatedCustomers
      );

      dispatch(deleteCustomer(customerId));

      return customerId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const CustomersSlice = createSlice({
  name: "customers",

  initialState: {
    loading: false,
    list: [],
    error: null,
  },

  reducers: {
    addCustomer: (state, action) => {
      state.list.push(action.payload);
    },

    updateCustomer: (state, action) => {
      state.list = state.list.map(c =>
        c.id === action.payload.id
          ? action.payload
          : c
      );
    },

    deleteCustomer: (state, action) => {
      state.list = state.list.filter(
        c => c.id !== action.payload
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })

      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addCustomer,
  updateCustomer,
  deleteCustomer,
} = CustomersSlice.actions;

export default CustomersSlice.reducer;