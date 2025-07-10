import {
    Form,
    Input,
    Button,
    Tag,
    Row,
    Col,
} from "antd";
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    HomeOutlined,
    MailOutlined,
    PhoneOutlined
} from "@ant-design/icons";
import { useEffect } from "react";

const InfoForm = ({ user, initialValues, isEditMode, setIsEditMode, onSubmit }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(initialValues);
    }, [initialValues]);

    return (
        <Form form={form} layout="vertical">
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        label="Name"
                        name="customerName"
                        rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
                    >
                        <Input disabled={!isEditMode} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label="Email" name="email">
                        <Input prefix={<MailOutlined />} disabled />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Phone Number"
                        name="phoneNumber"
                        rules={[
                            { required: true, message: "Vui lòng nhập số điện thoại!" },
                            {
                                pattern: /^[0-9]{9,12}$/,
                                message: "Số điện thoại không hợp lệ (9-12 chữ số)",
                            },
                        ]}
                    >
                        <Input prefix={<PhoneOutlined />} disabled={!isEditMode} />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                label="Address"
                name="customerAddress"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
            >
                <Input prefix={<HomeOutlined />} disabled={!isEditMode} />
            </Form.Item>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label="Created Date" name="createdDate">
                        <Input disabled />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Verified">
                        {user.verifyStatus ? (
                            <Tag icon={<CheckCircleOutlined />} color="success">
                                Đã xác thực
                            </Tag>
                        ) : (
                            <Tag icon={<CloseCircleOutlined />} color="error">
                                Chưa xác thực
                            </Tag>
                        )}
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label="Account Status">
                        {user.accountStatus ? (
                            <Tag color="blue">Đã kích hoạt tài khoản</Tag>
                        ) : (
                            <Tag color="red">Chưa kích hoạt tài khoản</Tag>
                        )}
                    </Form.Item>
                </Col>
            </Row>

            <div style={{ textAlign: "right", marginTop: 16 }}>
                {!isEditMode ? (
                    <Button
                        type="primary"
                        onClick={() => setIsEditMode(true)}
                        style={{
                            backgroundColor: "#4266b3",
                            borderColor: "#4266b3",
                        }}
                    >
                        Chỉnh sửa thông tin
                    </Button>
                ) : (
                    <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                        <Button
                            onClick={() => {
                                form.resetFields();
                                setIsEditMode(false);
                            }}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="primary"
                            onClick={() => {
                                form.validateFields()
                                    .then(onSubmit)
                                    .catch((err) => console.log("Validation failed", err));
                            }}
                            style={{
                                backgroundColor: "#4266b3",
                                borderColor: "#4266b3",
                            }}
                        >
                            Lưu
                        </Button>
                    </div>
                )}
            </div>
        </Form>
    );
};

export default InfoForm;
