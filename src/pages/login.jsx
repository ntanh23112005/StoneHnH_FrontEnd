import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, Input, message, notification, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUserAPI } from "../services/api.service";
import { useState, useContext } from "react";
import { AuthContext } from '../components/context/auth.context';

const LoginPage = () => {
    const [form] = Form.useForm()
    const [isLoadingLogin, setIsLoadingLogin] = useState(false)
    const navigate = useNavigate()
    const { setUser } = useContext(AuthContext)

    const onFinish = async (values) => {
        // console.log(">> Check values login: ", values);
        setIsLoadingLogin(true)
        const res = await LoginUserAPI(values.email, values.password)
        if (res.data) {
            message.success("Đăng nhập thành công")
            localStorage.setItem("access_token", res.data.access_token)
            setUser(res.data.user)
            navigate("/")
        } else {
            notification.error({
                message: "Error Login",
                description: JSON.stringify(res.message)
            })
        }
        setIsLoadingLogin(false)
    }

    return (
        <>
            <Row justify={"center"} style={{ marginTop: "30px" }}>
                <Col xs={24} md={16} lg={8}>
                    <fieldset style={{
                        padding: "15px",
                        margin: "5px",
                        border: "1px solid #ccc",
                        borderRadius: "8px"
                    }}>
                        <legend><h3>Login Page</h3></legend>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            style={{ margin: "10px" }}
                        // onFinishFailed={onFinishFailed}
                        >
                            <h2 style={{ textAlign: "center" }}>Login</h2>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!'
                                    },
                                    {
                                        type: "email",
                                        message: "Email sai định dạng"
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password onKeyDown={(event) => {
                                    if (event.key === 'Enter') form.submit()
                                }} />
                            </Form.Item>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button
                                    loading={isLoadingLogin}
                                    type="primary"
                                    onClick={() => form.submit()}>Login</Button>
                                <Link to={"/"}>Back to homepage <ArrowRightOutlined /> </Link>
                            </div>
                        </Form>
                        <Divider />
                        <div>
                            <p>Not have an account ? <Link to={"/register"}>Register here</Link></p>
                        </div>
                    </fieldset>
                </Col>
            </Row>
        </>
    )
}

export default LoginPage;