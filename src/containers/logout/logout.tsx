import { LogoutOutlined } from '@ant-design/icons'
import { Button } from 'antd'

const Logout = () => {
    const onLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/'
    }

    return (
        <Button
            onClick={onLogout}
            icon={<LogoutOutlined />}
        />
    )
}

export default Logout
