import { authApi } from '@/pages/auth/api'

import { axiosInstance } from '@/shared/config/api/config'

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

axiosInstance.interceptors.response.use(undefined, async function (error) {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        const refreshToken = localStorage.getItem('refresh_token')

        if (refreshToken) {
            try {
                const response = await authApi.refreshToken(refreshToken)

                localStorage.setItem('token', response.data.token)
                localStorage.setItem('refresh_token', response.data.refresh_token)

                return axiosInstance(originalRequest)
            } catch (e) {
                window.location.href = '/'
                localStorage.removeItem('token')
                localStorage.removeItem('refresh_token')

                return Promise.reject(error)
            }
        }
    }

    return Promise.reject(error)
})
