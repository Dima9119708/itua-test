import { AxiosError } from 'axios'

import type { ErrorResponse } from '@/shared/config/api/types'

export const handleApiError = (cb: (error: ErrorResponse) => void) => (error: unknown) => {
    if (error instanceof AxiosError && error.response && Object.hasOwn(error.response.data, 'message')) {
        cb?.(error.response.data)
    }
}
