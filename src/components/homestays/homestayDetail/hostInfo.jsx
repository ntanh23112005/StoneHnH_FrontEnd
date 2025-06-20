import {
    CheckCircleOutlined,
    HomeOutlined,
    MailOutlined,
    PhoneOutlined
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
        verifyStatus
    } = customer;

    const imageUrl = `/images/Customer/${customerPicture}`;

    return (
        <Card title="Chủ nhà" style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "flex-start" }}>
                <Avatar
                    size={100}
                    src={imageUrl}
                    alt={customerName}
                    style={{
                        border: "2px solid #ccc",
                        marginRight: 24,
                        flexShrink: 0
                    }}
                />

                <div>
                    <Title level={4} style={{ marginBottom: 8 }}>
                        {customerName}
                        {verifyStatus && (
                            <CheckCircleOutlined style={{ color: "#52c41a", marginLeft: 8 }} />
                        )}
                    </Title>
                    <Space direction="vertical" size={6}>
                        <Text><MailOutlined /> {email}</Text>
                        <Text><PhoneOutlined /> {phoneNumber}</Text>
                        <Text><HomeOutlined /> {customerAddress}</Text>
                        {verifyStatus ? (
                            <Tag color="green">Đã xác minh</Tag>
                        ) : (
                            <Tag color="red">Chưa xác minh</Tag>
                        )}
                    </Space>
                </div>
            </div>
        </Card>
    );
};

export default HostInfo;