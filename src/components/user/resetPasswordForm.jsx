import { Button, Form, Input, message, Typography } from "antd";
import { useState } from "react";
import { resetPasswordAPI, sendVerificationCodeAPI, verifyEmailCodeAPI } from "../../services/customer/user.api";
import "./RegisterPage.css";

const { Title } = Typography;

const ResetPasswordForm = () => {
    const [loading, setLoading] = useState(false);
    const [sendingCode, setSendingCode] = useState(false);

    const [form] = Form.useForm();

    const handleSendVerificationCode = async () => {
        try {
            const email = form.getFieldValue("email");
            if (!email) {
                message.warning("Vui lòng nhập email trước khi gửi mã xác thực.");
                return;
            }

            setSendingCode(true);
            const res = await sendVerificationCodeAPI(email);
            if (res.data.success) {
                message.success("Mã xác thực đã được gửi về email.");
            } else {
                message.error(res.data.message || "Gửi mã xác thực thất bại.");
            }
        } catch (error) {
            console.error(error);
            message.error("Đã xảy ra lỗi khi gửi mã xác thực.");
        } finally {
            setSendingCode(false);
        }
    };

    const onFinish = async (values) => {
        const { email, verificationCode, newPassword, confirmPassword } = values;

        if (newPassword !== confirmPassword) {
            message.warning("Mật khẩu xác nhận không khớp.");
            return;
        }

        setLoading(true);
        try {
            const verifyRes = await verifyEmailCodeAPI(email, verificationCode);

            if (!verifyRes.data.success) {
                message.error(verifyRes.data.message || "Xác thực mã không thành công.");
                setLoading(false);
                return;
            }

            const res = await resetPasswordAPI(email, newPassword);
            if (res.data.success) {
                message.success("Đặt lại mật khẩu thành công.");
                form.resetFields();
            } else {
                message.error(res.data.message || "Đặt lại mật khẩu thất bại.");
            }
        } catch (error) {
            console.error(error);
            message.error("Đã xảy ra lỗi khi đặt lại mật khẩu.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                maxWidth: 500,
                margin: "0 auto",
                padding: "40px 24px",
                border: "1px solid #f0f0f0",
                borderRadius: 8,
                background: "#fff",
            }}
        >
            <Title level={3} style={{ textAlign: "center" }}>
                Đặt Lại Mật Khẩu
            </Title>
            <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
                initialValues={{ email: "", verificationCode: "", newPassword: "", confirmPassword: "" }}
            >
                <Form.Item
                    label="Email"
                    required
                >
                    <Input.Group compact>
                        <Form.Item
                            name="email"
                            noStyle
                            rules={[
                                { required: true, message: "Vui lòng nhập email!" },
                                { type: "email", message: "Email không hợp lệ!" },
                            ]}
                        >
                            <Input
                                style={{ width: "calc(100% - 150px)" }}
                                placeholder="Nhập email đã xác thực"
                            />
                        </Form.Item>
                        <Button
                            type="primary"
                            onClick={handleSendVerificationCode}
                            loading={sendingCode}
                            style={{ width: 150 }}
                        >
                            Gửi Mã
                        </Button>
                    </Input.Group>
                </Form.Item>

                <Form.Item
                    label="Mã Xác Thực"
                    name="verificationCode"
                    rules={[{ required: true, message: "Vui lòng nhập mã xác thực!" }]}
                >
                    <Input placeholder="Nhập mã xác thực đã gửi về email" />
                </Form.Item>

                <Form.Item
                    label="Mật Khẩu Mới"
                    name="newPassword"
                    rules={[
                        { required: true, message: "Vui lòng nhập mật khẩu mới!" },
                        { min: 6, message: "Mật khẩu tối thiểu 6 ký tự!" },
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder="Mật khẩu mới" />
                </Form.Item>

                <Form.Item
                    label="Xác Nhận Mật Khẩu"
                    name="confirmPassword"
                    dependencies={["newPassword"]}
                    hasFeedback
                    rules={[
                        { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("newPassword") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Xác nhận mật khẩu mới" />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        block
                    >
                        Đặt Lại Mật Khẩu
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ResetPasswordForm;