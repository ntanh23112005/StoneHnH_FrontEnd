import { useContext, useState } from "react";
import {
  FundViewOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PayCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, message, theme, ConfigProvider } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { logoutAPI } from "../../../services/auth/api.auth";
import { AuthContext } from "../../context/auth.context";

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
      const res = await logoutAPI();
      if (res.data.message) {
        localStorage.removeItem("access_token");
        setUser(null);
        message.success("Đăng xuất thành công");
        navigate("/login");
      }
    } catch (err) {
      console.warn("Logout error:", err);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#c4b5fd",
        },
        components: {
          Layout: {
            siderBg: "#ede9fe",
            headerBg: "#f5f3ff",
            bodyBg: "#faf5ff",
          },
          Menu: {
            itemSelectedBg: "#ddd6fe",
            itemHoverBg: "#ede9fe",
            itemSelectedColor: "#6d28d9",
          },
          Button: {
            colorPrimary: "#c4b5fd",
            colorPrimaryHover: "#a78bfa",
            colorPrimaryActive: "#8b5cf6",
          },
        },
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="lg" // tự collapse khi nhỏ hơn 992px
          onBreakpoint={(broken) => {
            setCollapsed(broken);
          }}
          theme="light"
          style={{
            background: "#ede9fe",
            maxHeight: "100vh",
            borderRight: "1px solid #e9d5ff",
          }}
        >
          {/* Logo */}
          <div
            style={{
              height: 120, // tăng chiều cao để logo nổi bật
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f3e8ff",
              padding: 8,
            }}
          >
            <img
              src="/src/assets/logo/logo stone-03.svg"
              alt="logo"
              style={{
                width: collapsed ? 50 : 140, // logo to hơn
                height: "auto",
                objectFit: "contain",
              }}
            />
          </div>

          {/* Menu */}
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[location.pathname]}
            style={{
              background: "#ede9fe",
              color: "#6d28d9",
            }}
            items={[
              {
                key: "/admin",
                icon: <FundViewOutlined style={{ color: "#6d28d9" }} />,
                label: (
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "#6d28d9",
                    }}
                    to="/admin"
                  >
                    Tổng quan
                  </Link>
                ),
                style: { marginBottom: 10 },
              },
              {
                key: "/admin/users",
                icon: <UserOutlined style={{ color: "#6d28d9" }} />,
                label: (
                  <Link
                    style={{ textDecoration: "none", color: "#6d28d9" }}
                    to="/admin/users"
                  >
                    Người dùng
                  </Link>
                ),
                style: { marginBottom: 10 },
              },
              {
                key: "/admin/bookings",
                icon: <PayCircleOutlined style={{ color: "#6d28d9" }} />,
                label: (
                  <Link
                    style={{ textDecoration: "none", color: "#6d28d9" }}
                    to="/admin/bookings"
                  >
                    Booking
                  </Link>
                ),
                style: { marginBottom: 10 },
              },
              {
                key: "/admin/homestays",
                icon: <HomeOutlined style={{ color: "#6d28d9" }} />,
                label: (
                  <Link
                    style={{ textDecoration: "none", color: "#6d28d9" }}
                    to="/admin/homestays"
                  >
                    Homestay
                  </Link>
                ),
                style: { marginBottom: 10 },
              },
            ]}
          />

          {/* Footer */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              padding: "10px 16px",
              borderTop: "1px solid #e9d5ff",
              background: "#f3e8ff",
            }}
          >
            <Button
              type="text"
              onClick={() => navigate("/")}
              icon={<HomeOutlined style={{ color: "#6d28d9" }} />}
              style={{
                color: "#6d28d9",
                width: "100%",
                textAlign: "left",
              }}
            >
              {!collapsed && "Quay về trang chủ"}
            </Button>

            <Button
              type="text"
              icon={<LogoutOutlined style={{ color: "#6d28d9" }} />}
              onClick={handleLogout}
              style={{
                color: "#6d28d9",
                width: "100%",
                textAlign: "left",
              }}
            >
              {!collapsed && "Đăng xuất"}
            </Button>
          </div>
        </Sider>

        {/* Nội dung chính */}
        <Layout>
          <Header
            style={{
              padding: 0,
              background: "#f5f3ff",
              borderBottom: "1px solid #e9d5ff",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: "16px", width: 64, height: 64 }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
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
    </ConfigProvider>
  );
};

export default AdminLayout;