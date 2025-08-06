import '@ant-design/v5-patch-for-react-19'
import { ConfigProvider } from 'antd'
import { createRoot } from 'react-dom/client'

import App from '@/app/App'
import '@/app/interceptors/refresh-token'

import { NotificationProvider } from '@/shared/lib/notification'

createRoot(document.getElementById('root')!).render(
    <ConfigProvider theme={{ cssVar: true }}>
        <NotificationProvider>
            <App />
        </NotificationProvider>
    </ConfigProvider>
)
