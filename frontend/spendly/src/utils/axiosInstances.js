import axios from "axios"
import { BASE_URL } from "./apiPaths"

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, 
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
})

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token")
        if(accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if(error.response){
            if(error.response.status === 401) {
                window.location.href = "/login"
            } else if (error.response.status === 500) {
                console.log("Erro no servidor. Por favor tente novamente mais tarde.");
            }
        } else if (error.code === "ECONNABORTED"){
              console.log("Request time out. Por favor tente novamente");
        }
        return Promise.reject(error)
    }
)

export default axiosInstance

