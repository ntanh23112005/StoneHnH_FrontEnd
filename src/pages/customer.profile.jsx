import { useContext } from "react";
import { Card, Form, Input, Button, Row, Col, Avatar, Tag } from "antd";
import { AuthContext } from "../components/context/auth.context";
import { CheckCircleOutlined, CloseCircleOutlined, HomeOutlined, MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";

const CustomerProfile = () => {
    const { user, setUser } = useContext(AuthContext)
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                background: "#f0f2f5",
                minHeight: "100vh",
                padding: "40px",
            }}
        >
            <Card
                title="PROFILE"
                bordered={false}
                style={{ width: 800, borderRadius: 8 }}
                headStyle={{ color: "#4266b3", fontWeight: "bold", fontSize: 20 }}
            >
                <Row gutter={24}>
                    {/* Avatar */}
                    <Col span={6} style={{ textAlign: "center" }}>
                        <Avatar
                            size={120}
                            src={`/images/avatar/${user.customerPicture}`}
                            icon={<UserOutlined />}
                            style={{ border: "2px solid #4266b3" }}
                        />
                        <Button
                            type="primary"
                            style={{
                                marginTop: 12,
                                backgroundColor: "#4266b3",
                                borderColor: "#4266b3",
                            }}
                        >
                            Upload Picture
                        </Button>
                    </Col>

                    {/* Info */}
                    <Col span={18}>
                        <Form
                            layout="vertical"
                            initialValues={{
                                customerId: user.customerId,
                                customerName: user.customerName,
                                email: user.email,
                                phoneNumber: user.phoneNumber,
                                customerAddress: user.customerAddress,
                                createdDate: user.createdDate,
                            }}
                        >
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Customer ID">
                                        <Input value={user.customerId} disabled />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Name">
                                        <Input value={user.customerName} disabled />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Email">
                                        <Input
                                            prefix={<MailOutlined />}
                                            value={user.email}
                                            disabled
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Phone Number">
                                        <Input
                                            prefix={<PhoneOutlined />}
                                            value={user.phoneNumber}
                                            disabled
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item label="Address">
                                <Input
                                    prefix={<HomeOutlined />}
                                    value={user.customerAddress}
                                    disabled
                                />
                            </Form.Item>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Created Date">
                                        <Input
                                            value={new Date(user.createdDate).toLocaleDateString()}
                                            disabled
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Verified">
                                        {user.verifyStatus ? (
                                            <Tag icon={<CheckCircleOutlined />} color="success">
                                                Verified
                                            </Tag>
                                        ) : (
                                            <Tag icon={<CloseCircleOutlined />} color="error">
                                                Not Verified
                                            </Tag>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Account Status">
                                        {user.accountStatus ? (
                                            <Tag color="blue">Active</Tag>
                                        ) : (
                                            <Tag color="red">Inactive</Tag>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>

                            <div style={{ textAlign: "right", marginTop: 16 }}>
                                <Button
                                    type="primary"
                                    style={{
                                        backgroundColor: "#4266b3",
                                        borderColor: "#4266b3",
                                    }}
                                >
                                    Update Information
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default CustomerProfile;
