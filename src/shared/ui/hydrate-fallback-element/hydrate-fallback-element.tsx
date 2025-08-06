import { Spin } from 'antd'

const HydrateFallbackElement = () => {
    return (
        <div style={{ height: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Spin />
        </div>
    )
}

export default HydrateFallbackElement
