import { createBrowserRouter, redirect } from 'react-router-dom'

import { ROUTER_PATHS } from '@/shared/config/router/config'
import HydrateFallbackElement from '@/shared/ui/hydrate-fallback-element/hydrate-fallback-element'

export const router = createBrowserRouter([
    {
        path: '/',
        loader: async () => {
            const token = localStorage.getItem('token')

            if (!token) {
                return redirect('/auth')
            }

            return redirect('/employees')
        },
    },
    {
        path: ROUTER_PATHS.employees,
        lazy: async () => {
            const module = await import('@/pages/employees/view')

            return {
                element: <module.default />,
            }
        },
        hydrateFallbackElement: <HydrateFallbackElement />,
    },
    {
        path: ROUTER_PATHS.companyStructure,
        lazy: async () => {
            await new Promise((resolve) => setTimeout(resolve, 5000))
            const module = await import('@/pages/company-structure/view')

            return {
                element: <module.default />,
            }
        },
        hydrateFallbackElement: <HydrateFallbackElement />,
    },
    {
        path: ROUTER_PATHS.auth,
        lazy: async () => {
            const module = await import('@/pages/auth/view')

            return {
                element: <module.default />,
            }
        },
        hydrateFallbackElement: <HydrateFallbackElement />,
    },
    {
        path: '*',
        element: <div>404</div>,
    },
])
