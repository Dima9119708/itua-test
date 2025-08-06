import { CloseOutlined, FilterOutlined } from '@ant-design/icons'
import { Button, Card, Flex, Form, Input, Typography } from 'antd'
import { type CSSProperties, useState } from 'react'

import { companyUsersStore } from '@/entities/company-users/store'

const cardStyle: CSSProperties = {
    width: 280,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
}

const hideFiltersStyle: CSSProperties = {
    padding: 8,
}

const Filters = () => {
    const [showFilters, setShowFilters] = useState(true)
    const [form] = Form.useForm()

    const onFinish = (values: { name: string; patronymic: string; position: string; email: string }) => {
        companyUsersStore.setFilters(values)
    }

    const onReset = () => {
        form.resetFields()
        form.submit()
    }

    if (!showFilters) {
        return (
            <div style={hideFiltersStyle}>
                <Button
                    type="text"
                    size="large"
                    icon={<FilterOutlined />}
                    onClick={() => setShowFilters((prevState) => !prevState)}
                />
            </div>
        )
    }

    return (
        <Form
            form={form}
            autoComplete="off"
            layout="vertical"
            onFinish={onFinish}
        >
            <Card
                style={cardStyle}
                title={
                    <Flex
                        justify="space-between"
                        align="center"
                    >
                        <Typography>Фільтри</Typography>
                        <Button
                            type="text"
                            size="large"
                            icon={<CloseOutlined />}
                            onClick={() => setShowFilters(false)}
                        />
                    </Flex>
                }
                actions={[
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Фільрувати
                    </Button>,
                    <Button
                        type="default"
                        htmlType="button"
                        onClick={onReset}
                    >
                        Очистити
                    </Button>,
                ]}
            >
                <Form.Item
                    label="Ім'я"
                    name="name"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Прізвище"
                    name="patronymic"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Посада"
                    name="position"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                >
                    <Input />
                </Form.Item>
            </Card>
        </Form>
    )
}

export default Filters
