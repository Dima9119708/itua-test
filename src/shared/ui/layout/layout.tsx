import { Layout as AntdLayout, Flex, Typography } from 'antd'
import type { CSSProperties, FC, PropsWithChildren, ReactNode } from 'react'

const { Header, Content } = AntdLayout

type LayoutProps = {
    title: string
    menu?: ReactNode
    innerContent?: {
        bgColor?: string
    }
    logout?: ReactNode
}

const headerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    height: 48,
    lineHeight: '48px',
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: 'var(--ant-layout-body-bg)',
}

const layoutStyle: CSSProperties = {
    height: '100%',
    backgroundColor: 'var(--ant-layout-body-bg)',
}

const contentStyle: CSSProperties = {
    padding: 8,
    height: 'calc(100% - 48px)',
    overflowY: 'auto',
}

const innerContentStyle: CSSProperties = {
    backgroundColor: 'var(--ant-color-bg-base)',
    borderRadius: 'var(--ant-border-radius-lg)',
    minHeight: '100%',
}

const titleStyle: CSSProperties = {
    margin: 0,
    lineHeight: 'inherit',
}

const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children, title, menu, innerContent, logout }) => {
    return (
        <AntdLayout style={layoutStyle}>
            <Header style={headerStyle}>
                <Typography.Title
                    level={3}
                    style={titleStyle}
                >
                    {title}
                </Typography.Title>

                <Flex
                    align="center"
                    gap={8}
                >
                    {menu}

                    {logout}
                </Flex>
            </Header>
            <Content style={contentStyle}>
                <div style={{ ...innerContentStyle, backgroundColor: innerContent?.bgColor || innerContentStyle.backgroundColor }}>
                    {children}
                </div>
            </Content>
        </AntdLayout>
    )
}

export default Layout
