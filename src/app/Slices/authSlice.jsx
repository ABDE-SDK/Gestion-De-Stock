import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../config/axiosConfig';

const initialState = {
  loading: false,
  user: null,
  token: localStorage.getItem('token') || null,
  error: '',
};

export const loginUser=createAsyncThunk('auth/loginUser',
    async({email,password},{rejectWithValue})=>{
    try{
     const response=await axiosInstance.post('/login',{email,password})
     localStorage.setItem('token',response.data.token)
     return response.data
    }catch(error){
        return rejectWithValue(error?.response?.data?.message)
    }}
)
// 
export const register=createAsyncThunk('auth/register',
    async({username,email,password},{rejectWithValue})=>{
    try{
     const response=await axiosInstance.post('/register',{username,email,password})
     return response.data
    }catch(error){
        return rejectWithValue(error?.response?.data?.message || error.message)
    }}
)

export const authSlice =createSlice({
    name:'auth',
    initialState,
    reducers:{
        logoutUser:()=>{
            localStorage.removeItem("token")
        },
        setCredentials:(state,action)=>{
            // gestion de la persistance
           state.user=action.payload.user
           state.token=action.payload.token
        }
    },
  extraReducers: (builder) => {
    builder
      // login extrareducer
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // register extrareducer
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  }});

export default authSlice.reducer;
export const { logoutUser, setCredentials } = authSlice.actions;
