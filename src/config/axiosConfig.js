import axios from "axios";

const axiosInstance= axios.create({
    baseURL: 'http://localhost:3001',  // Use relative paths to leverage Vite proxy
    timeout: 5000,
    headers:{
        'Content-Type':'application/json',
    }
})
// Intercepteur pour AJOUTER le token à chaque requête
axiosInstance.interceptors.request.use(
    (config)=>{
        const token=localStorage.getItem('token')
        if(token){
            config.headers.Authorization=`Bearer ${token}`
        }
        return config
    }
    ,(error)=>Promise.reject(error)
)
// Intercepteur pour GÉRER les erreurs (ex: token expiré)
axiosInstance.interceptors.response.use(
    (response)=>response,
    (error)=>{
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token')
        }
        return Promise.reject(error)
    }
)
export default axiosInstance