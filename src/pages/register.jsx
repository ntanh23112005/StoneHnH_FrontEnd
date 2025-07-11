import { Button, Divider, Form, Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/user/register.css";
import {
    createCustomerAPI,
    sendVerificationCodeAPI,
    verifyEmailCodeAPI
} from "../services/customer/user.api";

const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [otpModalVisible, setOtpModalVisible] = useState(false);
    const [otp, setOtp] = useState("");
    const [verifying, setVerifying] = useState(false);
    const [countdown, setCountdown] = useState(0);

    // Khi load trang, kiểm tra localStorage
    useEffect(() => {
        const storedTimestamp = localStorage.getItem("register_send_time");
        if (storedTimestamp) {
            const elapsed = Math.floor((Date.now() - parseInt(storedTimestamp, 10)) / 1000);
            if (elapsed < 60) {
                setCountdown(60 - elapsed);
            }
        }
    }, []);

    // Giảm countdown mỗi giây
    useEffect(() => {
        if (countdown <= 0) return;

        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown]);

    const handleSendVerificationCode = async () => {
        const email = form.getFieldValue("email");
        if (!email) {
            notification.warning({
                message: "Vui lòng nhập email trước khi gửi mã xác thực."
            });
            return;
        }

        try {
            await sendVerificationCodeAPI(email);
            notification.success({
                message: "Đã gửi mã xác thực",
                description: "Vui lòng kiểm tra email."
            });
            setOtpModalVisible(true);
            // Lưu timestamp
            localStorage.setItem("register_send_time", Date.now().toString());
            setCountdown(60);
        } catch (err) {
            notification.error({
                message: "Gửi mã thất bại",
                description: err.message
            });
        }
    };

    const handleVerifyOtp = async () => {
        const email = form.getFieldValue("email");
        if (!/^\d{6}$/.test(otp)) {
            notification.warning({
                message: "Mã xác thực phải gồm 6 chữ số."
            });
            return;
        }
        setVerifying(true);
        try {
            const response = await verifyEmailCodeAPI(email, otp);
            if (response?.data?.success) {
                setIsEmailVerified(true);
                setOtpModalVisible(false);
                notification.success({
                    message: "Xác thực thành công"
                });
            } else {
                notification.error({
                    message: "Xác thực thất bại",
                    description: response?.data?.message || "Mã không hợp lệ"
                });
            }
        } catch (err) {
            notification.error({
                message: "Lỗi xác thực",
                description: err.message
            });
        } finally {
            setVerifying(false);
        }
    };

    const onFinish = async (values) => {
        if (!isEmailVerified) {
            notification.warning({
                message: "Bạn cần xác thực email trước khi đăng ký."
            });
            return;
        }

        try {
            const response = await createCustomerAPI({
                creationCustomer: {
                    customerName: values.fullName,
                    email: values.email,
                    password: values.password,
                    phoneNumber: values.phone
                },
                roleIds: ["R01"]
            });

            if (!response?.data?.success) {
                notification.error({
                    message: "Đăng ký thất bại",
                    description: response?.data?.message || "Email hoặc SDT đã tồn tại ở 1 tài khoản khác!"
                });
                return;
            }

            notification.success({
                message: "Đăng ký thành công"
            });
            navigate("/login");
        } catch (err) {
            notification.error({
                message: "Đăng ký thất bại",
                description: err.response?.data?.message || err.message
            });
        }
    };

    return (
        <div className="gradient-bg">
            <div className="form-container">
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    <h2 className="form-title">Register</h2>

                    <Form.Item
                        label="Họ tên"
                        name="fullName"
                        rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
                    >
                        <Input className="custom-input" placeholder="Nhập họ tên" />
                    </Form.Item>

                    <Form.Item label="Email" required>
                        <Input.Group compact>
                            <Form.Item
                                name="email"
                                noStyle
                                rules={[
                                    { required: true, message: "Vui lòng nhập email!" },
                                    { type: "email", message: "Email không hợp lệ!" }
                                ]}
                            >
                                <Input
                                    style={{ width: "calc(100% - 140px)" }}
                                    placeholder="example@email.com"
                                    disabled={isEmailVerified}
                                />
                            </Form.Item>
                            <Button
                                type="primary"
                                className="button-primary"
                                onClick={handleSendVerificationCode}
                                disabled={isEmailVerified || countdown > 0}
                                icon={<i className="fas fa-paper-plane"></i>}
                            >
                                {isEmailVerified
                                    ? "Đã xác thực"
                                    : countdown > 0
                                    ? `Gửi lại sau ${countdown}s`
                                    : "Gửi mã"}
                            </Button>
                        </Input.Group>
                    </Form.Item>

                    {isEmailVerified && (
                        <div className="verification-badge">
                            <i className="fas fa-check-circle"></i> Đã xác thực
                        </div>
                    )}

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                    >
                        <Input.Password className="custom-input" placeholder="Nhập mật khẩu" />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[
                            { required: true, message: "Vui lòng nhập số điện thoại!" },
                            { pattern: /^\d+$/, message: "Số điện thoại phải là số!" }
                        ]}
                    >
                        <Input className="custom-input" placeholder="Nhập số điện thoại" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            className="button-primary"
                        >
                            Đăng ký
                        </Button>
                    </Form.Item>

                    <Divider />
                    <p className="text-center">
                        Đã có tài khoản?{" "}
                        <Link to="/login" className="login-link">
                            Đăng nhập tại đây
                        </Link>
                    </p>
                </Form>
            </div>

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
                        className="button-primary"
                        loading={verifying}
                        onClick={handleVerifyOtp}
                        block
                        style={{ height: 44, fontSize: 16 }}
                    >
                        Xác thực
                    </Button>
                ]}
            >
                <p style={{ textAlign: "center" }}>
                    Vui lòng nhập mã xác thực gồm 6 chữ số được gửi đến email của bạn.
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

export default RegisterPage;