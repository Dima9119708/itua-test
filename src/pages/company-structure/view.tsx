import { Card, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

import HeaderMenu from '@/containers/header-menu/header-menu'
import Logout from '@/containers/logout/logout'

import { companyDepartmentsStore } from '@/entities/company-departments/store'

import { useNotification } from '@/shared/lib/notification'
import Layout from '@/shared/ui/layout/layout'
import { handleApiError } from '@/shared/utils/handleError'

import CompanyStructureItems from './components/company-structure-items'

const CompanyStructure = observer(() => {
    const notification = useNotification()
    const { departments } = companyDepartmentsStore

    useEffect(() => {
        const abortController = new AbortController()

        companyDepartmentsStore
            .getDepartments({
                data: {
                    page: 1,
                    itemsPerPage: 100,
                },
                signal: abortController.signal,
            })
            .catch(
                handleApiError((error) => {
                    notification.error({
                        message: 'Помилка',
                        description: error.message,
                    })
                })
            )

        return () => {
            abortController.abort()
        }
    }, [notification])

    return (
        <Layout
            title="Структура компанії"
            menu={<HeaderMenu />}
            logout={<Logout />}
            innerContent={{ bgColor: 'var(--ant-layout-body-bg)' }}
        >
            {departments.loading ? (
                <Card style={{ marginBottom: 8 }}>
                    <Spin size="small" /> Завантаження...
                </Card>
            ) : (
                <CompanyStructureItems items={departments.items} />
            )}
        </Layout>
    )
})

export default CompanyStructure
