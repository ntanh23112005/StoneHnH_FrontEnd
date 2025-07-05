import {
    CheckCircleOutlined,
    HomeOutlined,
    MailOutlined,
    PhoneOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Space, Tag, Typography } from "antd";

const { Title, Text } = Typography;

const HostInfo = ({ customer }) => {
    if (!customer) return null;

    const {
        customerName,
        email,
        phoneNumber,
        customerAddress,
        customerPicture,
        verifyStatus,
    } = customer;

    const imageUrl = `/images/avatar/${customerPicture}`;

    return (
        <Card
            style={{
                marginTop: 32,
                marginBottom: 32,
                borderRadius: 16,
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                border: "1px solid #f0f0f0",
                padding: 16,
            }}
            title={
                <span style={{ fontSize: 18, fontWeight: 600, color: "#4266b3" }}>
                    Chủ nhà
                </span>
            }
        >
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                <Avatar
                    size={100}
                    src={imageUrl}
                    alt={customerName}
                    style={{
                        border: "3px solid #4266b3",
                        marginRight: 24,
                        flexShrink: 0,
                    }}
                />

                <div style={{ flex: 1 }}>
                    <Title level={4} style={{ marginBottom: 8 }}>
                        {customerName}
                        {verifyStatus && (
                            <CheckCircleOutlined
                                style={{ color: "#52c41a", marginLeft: 8 }}
                            />
                        )}
                    </Title>

                    <Space
                        direction="vertical"
                        size={8}
                        style={{ fontSize: 15, color: "#555" }}
                    >
                        <Text>
                            <MailOutlined style={{ color: "#4266b3", marginRight: 6 }} />
                            {email}
                        </Text>
                        <Text>
                            <PhoneOutlined style={{ color: "#4266b3", marginRight: 6 }} />
                            {phoneNumber}
                        </Text>
                        <Text>
                            <HomeOutlined style={{ color: "#4266b3", marginRight: 6 }} />
                            {customerAddress}
                        </Text>
                        {verifyStatus ? (
                            <Tag
                                color="green"
                                style={{ borderRadius: 8, fontWeight: "500", padding: "3px 10px" }}
                            >
                                Đã xác minh
                            </Tag>
                        ) : (
                            <Tag
                                color="red"
                                style={{ borderRadius: 8, fontWeight: "500", padding: "3px 10px" }}
                            >
                                Chưa xác minh
                            </Tag>
                        )}
                    </Space>
                </div>
            </div>
        </Card>
    );
};

export default HostInfo;
