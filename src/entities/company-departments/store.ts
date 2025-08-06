import { makeAutoObservable, runInAction } from 'mobx'

import {
    type CompanyDepartmentsByIdParameters,
    type CompanyDepartmentsParameters,
    type CompanyDepartmentsResponse,
    apiCompanyDepartments,
} from '@/entities/company-departments/api'

import type { AsyncActionArgs } from '@/shared/types/mobx-action-async-types'

export class CompanyDepartmentsStore {
    parameters: CompanyDepartmentsParameters = {
        page: 1,
        itemsPerPage: 8,
    }

    departments: { items: CompanyDepartmentsResponse['hydra:member']; loading: boolean } = { items: [], loading: true }

    departmentsById: { items: CompanyDepartmentsResponse['hydra:member'] | null; loading: boolean } = { items: null, loading: false }

    constructor() {
        makeAutoObservable(this)
    }

    getDepartments = async (args: AsyncActionArgs<CompanyDepartmentsParameters>) => {
        try {
            this.departments.loading = true

            const data = await apiCompanyDepartments.departments(args.data, args.signal)

            runInAction(() => {
                this.departments.items = data.items
            })
        } finally {
            runInAction(() => {
                this.departments.loading = false
            })
        }
    }

    getDepartmentsById = async (args: AsyncActionArgs<CompanyDepartmentsByIdParameters>) => {
        try {
            this.departmentsById.loading = true

            const data = await apiCompanyDepartments.departmentsById(args.data, args.signal)

            runInAction(() => {
                this.departmentsById.items = data.items
            })
        } finally {
            runInAction(() => {
                this.departmentsById.loading = false
            })
        }
    }

    clear() {
        this.departments = { items: [], loading: true }
        this.departmentsById = { items: null, loading: false }
    }
}

export const companyDepartmentsStore = new CompanyDepartmentsStore()
