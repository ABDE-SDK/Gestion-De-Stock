import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AppRoutes from './routes/AppRoutes'
import {setCredentials,logoutUser,loginUser} from "./Slices/authSlice"
import { useNavigate } from 'react-router-dom'
import axiosInstance from './config/axiosConfig'
function App() {
  const dispatch = useDispatch()
  const navigate=useNavigate()
  useEffect(() => {
    const fetchUser= async ()=>{
    const token = localStorage.getItem('token')
    if (token) {
      try{
        const response=await axiosInstance.get("/me")
        console.log(response.data)
        dispatch(setCredentials({user:response.data.user, token:token }))
      }
      catch(error){
         console.error("error; "+error)
         localStorage.removeItem('token')
         dispatch(logoutUser())
         navigate("/login")
      }
    }
  }
  fetchUser()
}, [dispatch])

  return (
    <AppRoutes />
  );
}

export default App;