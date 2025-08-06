import axios from 'axios'

import { axiosInstance } from '@/shared/config/api/config'

export type Login = { login: string; password: string }
export type LoginResponse = {
    refresh_token: string
    token: string
}

const login = async (args: Login) =>
    axiosInstance.post<LoginResponse>('/auth/login', {
        login: args.login,
        password: args.password,
    })

const refreshToken = async (refreshToken: string) =>
    axios.post(`${import.meta.env.VITE_BASE_URL}auth/refresh_token`, {
        refresh_token: refreshToken,
    })

export const authApi = {
    login,
    refreshToken,
}
