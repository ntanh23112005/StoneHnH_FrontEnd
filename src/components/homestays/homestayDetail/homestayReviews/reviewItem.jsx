import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Rate, Space, Typography } from "antd";
import dayjs from "dayjs";

const { Text, Paragraph } = Typography;

const ReviewItem = ({ reviewerName, reviewerAvatar, content, rating, date }) => {
    return (
        <Card style={{ marginBottom: 24 }}>
            <Space align="start">
                <Avatar
                    size="large"
                    src={reviewerAvatar ? `/images/${reviewerAvatar}` : null}
                    icon={!reviewerAvatar && <UserOutlined />}
                />
                <div>
                    <Text strong>{reviewerName}</Text>
                    <div>
                        <Rate disabled value={rating} />
                    </div>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                        {dayjs(date).format("DD/MM/YYYY")}
                    </Text>
                </div>
            </Space>

            <Paragraph style={{ marginTop: 12 }}>{content}</Paragraph>
        </Card>
    );
};

export default ReviewItem;