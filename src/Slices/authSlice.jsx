import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false, // Hada houwa l-muhim
  },
  reducers: {
    // Action bash t-login
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload; // Payload t-9der t-7et fih smiya mitalan
    },
    // Action bash t-logout
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;