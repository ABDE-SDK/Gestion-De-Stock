import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axiosConfig';
export const fetchProducts=createAsyncThunk('products/fetchAll',async (userId,{rejectWithValue})=>{
try{
    const response=await axiosInstance.get('/products',{params:{
    user_id:userId
 }})
 return response.data
}catch(err){
 return rejectWithValue(
  err?.response?.data?.message || err.message
);
}})
const ProductsSlice=createSlice({
    name:"products",
    initialState:{loading:false,list:[],error:null},
    reducers:{
      addProduct:(state,action)=>{
        state.list.push(action.payload)
      },
      updateProduct:(state,action)=>{
        const index=action.payload.id
        state.list=state.list.map(p=>p.id==index?action.payload:p)
      },
      deleteProduct:(state,action)=>{
       state.list=state.list.filter(p=>p.id!==action.payload)
      }
    },
    extraReducers:(builder)=>{
      builder
        .addCase(fetchProducts.pending,(state)=>{
          state.loading=true
          state.error=null
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
          state.loading=false
          state.list=action.payload
        })
        .addCase(fetchProducts.rejected,(state,action)=>{
          state.loading=false
          state.error=action.payload
        })
    }
})
export const addProductAsync=createAsyncThunk('products/add',async(req ,{rejectWithValue,dispatch})=>{
    try{
      const res=await axiosInstance.post('/products',req)
      dispatch(addProduct(res.data))
      return res.data
    }
    catch(error){
       return rejectWithValue("error: "+error)
    }
})
export const removeProductAsync=createAsyncThunk('products/delete',async(productId ,{rejectWithValue,dispatch})=>{
    try{
      const res=await axiosInstance.delete(`/products/${productId}`)
      dispatch(deleteProduct(productId))
      return productId
    }
    catch(error){
       return rejectWithValue("error: "+error)
    }
})
export const updateProductAsync=createAsyncThunk('products/update',async(product ,{rejectWithValue,dispatch})=>{
    try{
      const res=await axiosInstance.put(`/products/${product.id}`,product)
      dispatch(updateProduct(res.data))
      return res.data
    }
    catch(error){
       return rejectWithValue("error: "+error)
    }
})
export default ProductsSlice.reducer
export const {addProduct,deleteProduct,updateProduct} = ProductsSlice.actions