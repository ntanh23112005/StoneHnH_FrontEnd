import { useContext, useState } from 'react';
import {
    FundViewOutlined,
    HomeOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PayCircleOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, message, theme } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { logoutAPI } from '../../../services/auth/api.auth';
import { AuthContext } from '../../context/auth.context';

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleLogout = async () => {
        try {
            const res = await logoutAPI()
            // console.log(res);
            if (res.data.message) {
                localStorage.removeItem("access_token");
                setUser(null);

                message.success("Đăng xuất thành công")
                navigate("/login");
            }
        } catch (err) {
            console.warn("Logout error:", err);
        }
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider className="custom-sider" trigger={null} collapsible collapsed={collapsed}>
                <div
                    className="demo-logo-vertical"
                    style={{
                        height: 70,
                        margin: 0,
                        padding: 16,
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 20,
                        textAlign: 'center',
                        lineHeight: '32px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#e6f4ff'
                    }}
                >
                    <img src="/src/assets/logo/logo stone-03.svg" alt="" />
                </div>
                <Menu theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={[
                        {
                            key: '/admin',
                            icon: <FundViewOutlined />,
                            label: <Link style={{ textDecoration: 'none' }} to="/admin">Tổng quan</Link>,
                        },
                        {
                            key: '/admin/users',
                            icon: <UserOutlined />,
                            label: <Link style={{ textDecoration: 'none' }} to="/admin/users">Người dùng</Link>,
                        },
                        {
                            key: '/admin/bookings',
                            icon: <PayCircleOutlined />,
                            label: <Link style={{ textDecoration: 'none' }} to="/admin/bookings">Booking</Link>,
                        },
                        {
                            key: '/admin/homestays',
                            icon: <HomeOutlined />,
                            label: <Link style={{ textDecoration: 'none' }} to="/admin/homestays">Homestay</Link>,
                        },
                    ]}
                />

                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        padding: '10px 16px',
                        borderTop: '1px solidrgb(255, 255, 255)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 16,
                    }}
                >
                    <Button
                        type="text"
                        onClick={() => navigate('/')}
                        icon={<HomeOutlined />}
                        style={{
                            color: '#fff',
                            width: '100%',
                            textAlign: 'left',
                        }}
                    >
                        {!collapsed && 'Quay về trang chủ'}
                    </Button>

                    <Button
                        type="text"
                        icon={<LogoutOutlined />}
                        onClick={handleLogout}
                        style={{
                            color: '#fff',
                            width: '100%',
                            textAlign: 'left',
                        }}
                    >
                        {!collapsed && 'Đăng xuất'}
                    </Button>
                </div>

            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{ fontSize: '16px', width: 64, height: 64 }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
