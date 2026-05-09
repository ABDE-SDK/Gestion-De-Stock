import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import usersData from '../../data/users.json';

let users = [...usersData.users];

const initialState = {
  loading: false,
  user: null,
  error: '',
};

export const login = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return rejectWithValue('Invalid credentials');
  }
  return user;
});

export const register = createAsyncThunk('auth/register', async ({ username, email, password }, { rejectWithValue }) => {
  const existingUser = users.find((u) => u.email === email || u.username === username);
  if (existingUser) {
    return rejectWithValue('User already exists');
  }
  const newUser = {
    id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    username,
    email,
    password,
    name: username,
  };
  users.push(newUser);
  return newUser;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = '';
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default authSlice.reducer;
export const { logout, setCredentials } = authSlice.actions;
