import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

// Create an axios instance with a predefined base URL, allowing API access using only endpoints.
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

// Add an interceptor to every network request made
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        
        // If the access token exists, attach it to the request header as Authorization (Bearer token)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api
