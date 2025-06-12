import { Button, Input, Form, notification, Row, Col, Divider } from "antd"
import { registerUserAPI } from '../services/api.service';
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate()

    const onFinish = async (values) => {
        console.log(">> Check values: ", values)
        //call api create user
        const res = await registerUserAPI(
            values.fullName,
            values.email,
            values.password,
            values.phone)

        if (res.data) {
            notification.success({
                message: "Register User",
                description: "Đăng ký thành công"
            })
            navigate("/login")
        } else {
            notification.error({
                message: "Register User Error",
                description: JSON.stringify(res.message)
            })
        }
    }
    return (
        <>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                style={{ margin: "10px" }}
            // onFinishFailed={onFinishFailed}
            >
                <h2 style={{ textAlign: "center" }}>Register Account</h2>

                <Row justify={"center"}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            label="Full Name"
                            name="fullName"
                            rules={[{ required: true, message: 'Please input your full name!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify={"center"}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify={"center"}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify={"center"}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            label="Phone Number"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone number!'
                                },
                                {
                                    // required: true,
                                    pattern: new RegExp(/\d+/g),
                                    message: "Phone number is a number!"
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify={"center"}>
                    <Col xs={24} md={8}>
                        <div>
                            <Button type="primary"
                                onClick={() => form.submit()}>Register</Button>
                        </div>
                    </Col>
                </Row>

                <Row justify={"center"}>
                    <Col xs={24} md={8}>
                        <Divider></Divider>
                        <div>
                            <p>Have an account ? <Link to={"/login"}>Login here</Link></p>
                        </div>
                    </Col>
                </Row>

            </Form>


        </>
    )
}

export default RegisterPage;