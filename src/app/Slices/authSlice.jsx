import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersData from "../../data/users.json";

let users = [...usersData.users];

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return rejectWithValue(
        "Email ou mot de passe incorrect."
      );
    }

    return user;
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (
    { username, email, password },
    { rejectWithValue }
  ) => {
    const existingUser = users.find(
      (u) =>
        u.email === email ||
        u.username === username
    );

    if (existingUser) {
      return rejectWithValue(
        "Utilisateur déjà existant."
      );
    }

    const newUser = {
      id: Date.now(),
      username,
      email,
      password,
      name: username,
    };

    users.push(newUser);

    return newUser;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;

      localStorage.removeItem("user");
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;

        localStorage.setItem(
          "user",
          JSON.stringify(action.payload)
        );
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;