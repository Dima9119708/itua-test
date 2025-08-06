import { makeAutoObservable, runInAction } from 'mobx'

import { type CompanyUsersParameters, type CompanyUsersResponse, apiCompanyUsers } from '@/entities/company-users/api'

import type { AsyncActionArgs } from '@/shared/types/mobx-action-async-types'

export class CompanyUsersStore {
    loading = true

    parameters: CompanyUsersParameters = {
        page: 1,
        itemsPerPage: 8,
    }

    data: { items: CompanyUsersResponse['hydra:member']; total: number } = { items: [], total: 0 }

    constructor() {
        makeAutoObservable(this)
    }

    setFilters(params: CompanyUsersParameters) {
        this.parameters = {
            ...this.parameters,
            ...params,
        }
    }

    setPage(page: number) {
        this.parameters.page = page
    }

    users = async (args: AsyncActionArgs<CompanyUsersParameters>) => {
        try {
            this.loading = true

            const data = await apiCompanyUsers.users(args?.data, args.signal)

            runInAction(() => {
                this.data = data
            })
        } finally {
            runInAction(() => {
                this.loading = false
            })
        }
    }

    clear() {
        this.data = { items: [], total: 0 }
        this.parameters = {
            page: 1,
            itemsPerPage: 8,
        }
        this.loading = true
    }
}

export const companyUsersStore = new CompanyUsersStore()
