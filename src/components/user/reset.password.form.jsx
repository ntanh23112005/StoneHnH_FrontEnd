import { Button, Form, Input, message, Modal, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPasswordAPI, sendVerificationCodeAPI, verifyEmailCodeAPI } from "../../services/customer/user.api";

const { Title } = Typography;

const ResetPasswordForm = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [sendingCode, setSendingCode] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [otpModalVisible, setOtpModalVisible] = useState(false);
    const [otp, setOtp] = useState("");
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(0);

    // Khi load trang, kiểm tra localStorage
    useEffect(() => {
        const storedTimestamp = localStorage.getItem("reset_password_send_time");
        if (storedTimestamp) {
            const elapsed = Math.floor((Date.now() - parseInt(storedTimestamp, 10)) / 1000);
            if (elapsed < 60) {
                setCountdown(60 - elapsed);
            }
        }
    }, []);

    // Bắt đầu đếm ngược
    useEffect(() => {
        if (countdown <= 0) return;

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown]);

    // Gửi mã xác thực
    const handleSendVerificationCode = async () => {
        const email = form.getFieldValue("email");
        if (!email) {
            message.warning("Vui lòng nhập email trước khi gửi mã xác thực.");
            return;
        }

        setSendingCode(true);
        try {
            const res = await sendVerificationCodeAPI(email);
            if (res.data.success) {
                message.success("Mã xác thực đã được gửi về email.");
                setOtpModalVisible(true);
                localStorage.setItem("reset_password_send_time", Date.now().toString());
                setCountdown(60);
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

    // Xác thực OTP
    const handleVerifyOtp = async () => {
        const email = form.getFieldValue("email");
        if (!/^\d{6}$/.test(otp)) {
            message.warning("Mã xác thực phải gồm 6 chữ số.");
            return;
        }

        setVerifying(true);
        try {
            const res = await verifyEmailCodeAPI(email, otp);
            if (res.data.success) {
                message.success("Xác thực thành công.");
                setIsEmailVerified(true);
                setOtpModalVisible(false);
            } else {
                message.error(res.data.message || "Xác thực mã thất bại.");
            }
        } catch (error) {
            console.error(error);
            message.error("Đã xảy ra lỗi khi xác thực.");
        } finally {
            setVerifying(false);
        }
    };

    // Submit form
    const onFinish = async (values) => {
        const { email, newPassword, confirmPassword } = values;

        if (!isEmailVerified) {
            message.warning("Bạn cần xác thực email trước khi đặt lại mật khẩu.");
            return;
        }

        if (newPassword !== confirmPassword) {
            message.warning("Mật khẩu xác nhận không khớp.");
            return;
        }

        setLoading(true);
        try {
            const res = await resetPasswordAPI(email, newPassword);
            if (res?.data?.success === true) {
                message.success("Đặt lại mật khẩu thành công.");
                form.resetFields();
                setIsEmailVerified(false);
                localStorage.removeItem("reset_password_send_time");
                navigate("/login");
            } else {
                message.error(res?.data?.message || "Đặt lại mật khẩu thất bại.");
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
            <Form layout="vertical" form={form} onFinish={onFinish}>
                <Form.Item label="Email" required>
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
                                disabled={isEmailVerified}
                            />
                        </Form.Item>
                        <Button
                            type="primary"
                            onClick={handleSendVerificationCode}
                            disabled={isEmailVerified || countdown > 0}
                            style={{ width: 150 }}
                        >
                            {isEmailVerified
                                ? "Đã xác thực"
                                : countdown > 0
                                    ? `Gửi lại sau ${countdown}s`
                                    : "Gửi Mã"}
                        </Button>
                    </Input.Group>
                </Form.Item>

                {isEmailVerified && (
                    <div style={{ marginBottom: 16, color: "green" }}>
                        <i className="fas fa-check-circle"></i> Email đã xác thực.
                    </div>
                )}

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
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Đặt Lại Mật Khẩu
                    </Button>
                </Form.Item>
            </Form>

            {/* Modal Nhập OTP */}
            <Modal
                title="Nhập mã xác thực"
                open={otpModalVisible}
                closable={false}
                maskClosable={false}
                centered
                footer={[
                    <Button
                        key="verify"
                        type="primary"
                        loading={verifying}
                        onClick={handleVerifyOtp}
                        block
                    >
                        Xác thực
                    </Button>,
                ]}
            >
                <p style={{ textAlign: "center" }}>
                    Vui lòng nhập mã xác thực gồm 6 chữ số đã gửi về email của bạn.
                </p>
                <Input.OTP
                    length={6}
                    inputType="numeric"
                    autoFocus
                    value={otp}
                    onChange={(value) => setOtp(value)}
                    className="custom-otp-input"
                />
            </Modal>
        </div>
    );
};

export default ResetPasswordForm;