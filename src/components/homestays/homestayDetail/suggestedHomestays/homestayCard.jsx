import { EnvironmentOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Rate, Tag, Typography } from "antd";

const { Meta } = Card;
const { Text } = Typography;

const HomestayCard = ({
    name,
    image,
    address,
    price,
    rating,
    maxCustomer,
    numberOfBeds,
    onClick
}) => {
    return (
        <Card
            hoverable
            cover={
                <img
                    alt={name}
                    src={`/images/${image}`}
                    style={{ height: 200, objectFit: "cover" }}
                />
            }
            onClick={onClick}
            style={{ width: 300, borderRadius: 8 }}
        >
            <Meta title={name} description={<Text type="secondary">{address}</Text>} />
            <div style={{ marginTop: 12 }}>
                <Tag icon={<UserOutlined />} color="blue">
                    {maxCustomer} khách
                </Tag>
                <Tag icon={<HomeOutlined />} color="cyan">
                    {numberOfBeds} giường
                </Tag>
                <Tag icon={<EnvironmentOutlined />} color="green">
                    {price.toLocaleString("vi-VN")}₫ / đêm
                </Tag>
            </div>
            {rating && (
                <div style={{ marginTop: 8 }}>
                    <Rate disabled value={rating} />
                </div>
            )}
        </Card>
    );
};

export default HomestayCard;