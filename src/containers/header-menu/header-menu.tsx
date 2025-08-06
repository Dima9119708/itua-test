import { Menu, type MenuProps } from 'antd'
import type { CSSProperties } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { ROUTER_PATHS } from '@/shared/config/router/config'

const items = [
    {
        label: 'Співробітники',
        key: ROUTER_PATHS.employees,
    },
    {
        label: 'Структура компанії',
        key: ROUTER_PATHS.companyStructure,
    },
]

const menuStyle: CSSProperties = {
    backgroundColor: 'var(--ant-layout-body-bg)',
}

const HeaderMenu = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const onClick: MenuProps['onClick'] = (e) => {
        navigate(e.key)
    }

    return (
        <Menu
            style={menuStyle}
            theme="light"
            mode="horizontal"
            items={items}
            onClick={onClick}
            selectedKeys={[location.pathname]}
        />
    )
}

export default HeaderMenu
