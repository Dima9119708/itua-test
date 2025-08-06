import axios from 'axios'

console.log('BASE_URL =', import.meta.env.VITE_BASE_URL)

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
})
