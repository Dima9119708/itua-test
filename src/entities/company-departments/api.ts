import { axiosInstance } from '@/shared/config/api/config'
import type { PaginatedDataApi, ParametersDataApi } from '@/shared/config/api/types'

export type CompanyDepartmentsResponse = PaginatedDataApi<{
    id: number
    title: string
    chief: {
        fullName: string
        position: string
    }
    lvl: number
    parent: {
        id: number
    }
}>

export type CompanyDepartmentsParameters = ParametersDataApi

export type CompanyDepartmentsByIdParameters = {
    id: number
}

const departments = async (params?: CompanyDepartmentsParameters, signal?: AbortSignal) => {
    const response = await axiosInstance.get<CompanyDepartmentsResponse>('/company/departments', {
        params,
        signal: signal,
    })

    return {
        items: response.data['hydra:member'],
        total: response.data['hydra:totalItems'],
    }
}

const departmentsById = async (params?: CompanyDepartmentsByIdParameters, signal?: AbortSignal) => {
    const response = await axiosInstance.get<CompanyDepartmentsResponse>('/company/departments', {
        params,
        signal: signal,
    })

    return {
        items: response.data['hydra:member'],
        total: response.data['hydra:totalItems'],
    }
}

export const apiCompanyDepartments = {
    departments,
    departmentsById,
}
