import { Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

import HeaderMenu from '@/containers/header-menu/header-menu'
import Logout from '@/containers/logout/logout'

import { companyUsersStore } from '@/entities/company-users/store'

import Layout from '@/shared/ui/layout/layout'

import Filters from './components/filters'
import Table from './components/table'

const Employees = observer(() => {
    useEffect(() => {
        return () => {
            companyUsersStore.clear()
        }
    }, [])

    return (
        <Layout
            title="Співробітники"
            menu={<HeaderMenu />}
            logout={<Logout />}
        >
            <Flex>
                <Filters />
                <Table />
            </Flex>
        </Layout>
    )
})

export default Employees
