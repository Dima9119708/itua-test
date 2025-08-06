import { axiosInstance } from '@/shared/config/api/config'
import type { PaginatedDataApi, ParametersDataApi } from '@/shared/config/api/types'

export type CompanyUsersResponse = PaginatedDataApi<{
    id: number
    email: string
    lastName: string
    position: string
    name: string
}>

export type CompanyUsersParameters = ParametersDataApi<{
    name?: string
    position?: string
    email?: string
    lastName?: string
}>

const users = async (params?: CompanyUsersParameters, signal?: AbortSignal) => {
    const response = await axiosInstance.get<CompanyUsersResponse>('/company/users', {
        params,
        signal: signal,
    })

    return {
        items: response.data['hydra:member'].map((user) => ({ key: user.id, ...user })),
        total: response.data['hydra:totalItems'],
    }
}

export const apiCompanyUsers = {
    users,
}
