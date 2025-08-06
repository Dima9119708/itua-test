import { notification } from 'antd'
import type { NotificationInstance } from 'antd/es/notification/interface'
import { type FC, type PropsWithChildren, createContext, use } from 'react'

const Context = createContext<NotificationInstance>({} as NotificationInstance)

export const useNotification = () => {
    return use(Context)
}

export const NotificationProvider: FC<PropsWithChildren> = ({ children }) => {
    const [api, contextHolder] = notification.useNotification()

    return (
        <Context value={api as NotificationInstance}>
            {contextHolder}
            {children}
        </Context>
    )
}
