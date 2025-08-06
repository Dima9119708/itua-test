import { Button, Card, Flex, Form, Input } from 'antd'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'

import type { Login } from '@/pages/auth/api'
import { Store } from '@/pages/auth/store'

import { ROUTER_PATHS } from '@/shared/config/router/config'
import { useNotification } from '@/shared/lib/notification'
import { handleApiError } from '@/shared/utils/handleError'

const authStore = new Store()

const View = observer(() => {
    const notification = useNotification()
    const { loading } = authStore
    const navigate = useNavigate()

    const onFinish = (values: Login) => {
        authStore
            .login({
                data: values,
            })
            .then(() => {
                navigate(ROUTER_PATHS.employees)
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

    return (
        <Flex
            align="center"
            justify="center"
            style={{ height: '100%' }}
        >
            <Card>
                <Form
                    name="basic"
                    labelCol={{ span: 15 }}
                    initialValues={{
                        login: import.meta.env.VITE_LOGIN,
                        password: import.meta.env.VITE_PASSWORD,
                    }}
                    layout="vertical"
                    autoComplete="off"
                    onFinish={onFinish}
                    disabled={loading}
                >
                    <Form.Item
                        label="Логин"
                        name="login"
                        rules={[{ required: true, message: 'Будь ласка, введіть свій логін!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={[{ required: true, message: 'Будь ласка, введіть свій пароль!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Button
                        loading={loading}
                        type="primary"
                        htmlType="submit"
                    >
                        Увійти
                    </Button>
                </Form>
            </Card>
        </Flex>
    )
})

export default View
