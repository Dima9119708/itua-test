import { type TableColumnsType } from 'antd'
import { Table as AntdTable } from 'antd'
import { observer } from 'mobx-react-lite'
import { type CSSProperties, useEffect } from 'react'

import { companyUsersStore } from '@/entities/company-users/store'

import { useNotification } from '@/shared/lib/notification'
import { handleApiError } from '@/shared/utils/handleError'

const columns: TableColumnsType = [
    { title: "Ім'я", dataIndex: 'name', key: 'name' },
    { title: 'Прізвище', dataIndex: 'patronymic', key: 'patronymic' },
    { title: 'Посада', dataIndex: 'position', key: 'position' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
]

const tableStyle: CSSProperties = {
    padding: 16,
    width: '100%',
}

const Table = observer(() => {
    const { parameters, loading, data } = companyUsersStore
    const notification = useNotification()

    useEffect(() => {
        const abortController = new AbortController()

        companyUsersStore
            .users({
                data: parameters,
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
    }, [parameters, notification])

    return (
        <AntdTable
            style={tableStyle}
            columns={columns}
            dataSource={data.items}
            pagination={{
                current: parameters.page,
                total: data.total,
                pageSize: parameters.itemsPerPage,
                onChange: (newPage) => {
                    companyUsersStore.setPage(newPage)
                },
                showSizeChanger: false,
            }}
            loading={loading}
        />
    )
})

export default Table
