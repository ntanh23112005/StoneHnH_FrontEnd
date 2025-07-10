import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, message, notification, Row, Col, Typography, Space, Card } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoginGoogleAPI, LoginUserAPI } from "../services/auth/api.auth.js";
import { useState, useContext } from "react";
import { AuthContext } from '../components/context/auth.context';
import { GoogleLogin } from "@react-oauth/google";

const { Title, Text } = Typography;

const LoginPage = () => {
    const [form] = Form.useForm();
    const [isLoadingLogin, setIsLoadingLogin] = useState(false);
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from || "/";

    const onFinish = async (values) => {
        setIsLoadingLogin(true);
        const res = await LoginUserAPI(values.email, values.password);
        if (res.data) {
            message.success("Đăng nhập thành công");
            localStorage.setItem("access_token", res.data.accessToken);
            setUser(res.data.user);
            navigate(from, { replace: true });
        } else {
            // console.log(res);
            notification.error({
                message: "Error Login",
                description: JSON.stringify(res.message)
            });
        }
        setIsLoadingLogin(false);
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #f0f2f5, #d6e4ff)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px"
            }}
        >
            <Row
                justify="center"
                align="middle"
                style={{ width: "100%" }}
            >
                <Col
                    xs={24}
                    sm={20}
                    md={14}
                    lg={10}
                    xl={8}
                >
                    <Card
                        style={{
                            width: "100%",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                            borderRadius: 12
                        }}
                        bodyStyle={{ padding: "24px" }}
                    >
                        <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>Login</Title>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    { required: true, message: 'Please input your email!' },
                                    { type: "email", message: "Email sai định dạng" }
                                ]}
                            >
                                <Input placeholder="Enter your email" />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password
                                    placeholder="Enter your password"
                                    autoComplete="off"
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') form.submit();
                                    }}
                                />
                            </Form.Item>
                            <Space direction="vertical" style={{ width: "100%" }}>
                                <Button
                                    loading={isLoadingLogin}
                                    type="primary"
                                    block
                                    onClick={() => form.submit()}
                                >
                                    Login
                                </Button>
                                <GoogleLogin
                                    onSuccess={async (credentialResponse) => {
                                        try {
                                            const res = await LoginGoogleAPI(credentialResponse.credential);
                                            if (res.data && res.data.accessToken) {
                                                localStorage.setItem("access_token", res.data.accessToken);
                                                setUser(res.data.user);
                                                message.success("Đăng nhập Google thành công");
                                                navigate("/");
                                            } else {
                                                notification.error({
                                                    message: "Lỗi đăng nhập",
                                                    description: res.message || "Không thể đăng nhập bằng Google"
                                                });
                                            }
                                        } catch (err) {
                                            notification.error({
                                                message: "Lỗi hệ thống",
                                                description: err.response?.data?.message || err.message
                                            });
                                        }
                                    }}
                                    onError={() => {
                                        notification.error({
                                            message: "Google Login Failed",
                                            description: "Không thể đăng nhập bằng Google"
                                        });
                                    }}
                                />
                            </Space>

                            <Divider />
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Link to={"/"}>
                                    <ArrowRightOutlined /> Back to homepage
                                </Link>
                                <Text>
                                    Not have an account?{" "}
                                    <Link to={"/register"}>Register here</Link>
                                </Text>
                            </div>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default LoginPage;
