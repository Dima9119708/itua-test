export type ErrorResponse = {
    message: string
}

export type PaginatedDataApi<T> = {
    'hydra:member': T[]
    'hydra:totalItems': number
}

export type ParametersDataApi<T = unknown> = {
    page?: number
    itemsPerPage?: number
} & T
