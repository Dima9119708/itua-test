import { makeAutoObservable, runInAction } from 'mobx'

import type { AsyncActionArgs } from '@/shared/types/mobx-action-async-types'

import { type Login, authApi } from './api'

export class Store {
    loading = false

    constructor() {
        makeAutoObservable(this)
    }

    login = async (args: AsyncActionArgs<Login>) => {
        try {
            this.loading = true
            const response = await authApi.login(args.data)

            localStorage.setItem('token', response.data.token)
            localStorage.setItem('refresh_token', response.data.refresh_token)
        } finally {
            runInAction(() => {
                this.loading = false
            })
        }
    }
}
