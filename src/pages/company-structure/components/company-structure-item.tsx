import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Flex, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import { type CSSProperties, type FC, useEffect, useState } from 'react'

import type { CompanyDepartmentsResponse } from '@/entities/company-departments/api'
import { CompanyDepartmentsStore } from '@/entities/company-departments/store'

import { useNotification } from '@/shared/lib/notification'
import { handleApiError } from '@/shared/utils/handleError'

import CompanyStructureItems from './company-structure-items'

const cardStyle: CSSProperties = {
    marginBottom: 16,
}

const CompanyStructureItem: FC<
    Pick<CompanyDepartmentsResponse['hydra:member'][number], 'title' | 'chief' | 'parent' | 'lvl'> & { indent?: number }
> = observer(({ title, parent, indent = 0, chief, lvl }) => {
    const notification = useNotification()
    const [show, setShow] = useState(false)

    const [companyDepartmentsStore] = useState(() => new CompanyDepartmentsStore())

    const {
        departmentsById: { items, loading },
    } = companyDepartmentsStore

    const ml = indent + 25

    useEffect(() => {
        const abortController = new AbortController()

        if (show) {
            companyDepartmentsStore
                .getDepartmentsById({
                    data: {
                        id: parent.id,
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
        }

        return () => {
            abortController.abort()
            companyDepartmentsStore.clear()
        }
    }, [show, parent, notification, companyDepartmentsStore])

    return (
        <>
            <Card style={cardStyle}>
                <Flex
                    align="center"
                    justify="space-between"
                    gap={8}
                >
                    <Flex
                        align="center"
                        gap={8}
                    >
                        <Button
                            loading={loading}
                            disabled={lvl === 0}
                            type="primary"
                            icon={show ? <MinusCircleOutlined /> : <PlusOutlined />}
                            onClick={() => setShow((prevState) => !prevState)}
                        />

                        <Typography>{title}</Typography>
                    </Flex>

                    {`${chief.position}: ${chief.fullName}`}
                </Flex>
            </Card>

            <div style={{ marginLeft: ml }}>
                {items?.length == 0 && (
                    <Card style={{ marginBottom: 8 }}>
                        <Typography>Подразделений нет</Typography>
                    </Card>
                )}

                {items && items.length > 0 && (
                    <CompanyStructureItems
                        items={items}
                        indent={ml}
                    />
                )}
            </div>
        </>
    )
})

export default CompanyStructureItem
