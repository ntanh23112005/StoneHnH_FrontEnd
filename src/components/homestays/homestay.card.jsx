import {
    CarOutlined,
    EnvironmentOutlined,
    HeartFilled,
    HeartOutlined,
    RestOutlined,
    StarFilled,
    UserOutlined,
    WifiOutlined
} from '@ant-design/icons';
import { Button, Card, Tag, Typography } from 'antd';
import { useState } from 'react';
import './HomestayCard.css';

const { Title, Text } = Typography;

const HomestayCard = ({ data }) => {
    const [liked, setLiked] = useState(false);

    const formatCurrency = (number) => {
        return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    return (
        <>
            <Card
                hoverable
                className="homestay-card"
                cover={
                    <div className="cover-container">
                        <img
                            alt={data.location}
                            src={data.image}
                            className="cover-image"
                        />
                        <button
                            onClick={() => setLiked(!liked)}
                            className="heart-button"
                        >
                            {liked ? (
                                <HeartFilled className="text-red" />
                            ) : (
                                <HeartOutlined className="text-gray" />
                            )}
                        </button>

                        <div className="rating-badge">
                            <StarFilled className="text-yellow" />
                            <span className="rating-text">{data.rating}</span>
                        </div>
                    </div>
                }
            >
                <div className="top-info">
                    <Title level={5} className="title">{data.name}</Title>
                    <div className="location">
                        <EnvironmentOutlined className="icon" />
                        {data.distance}
                    </div>
                </div>

                <Text type="secondary" className="description">
                    <UserOutlined className="icon" />
                    {data.description}
                </Text>

                <div className="price-book">
                    <div>
                        <Text type="secondary">Giá từ </Text>
                        <Text strong className="price">{formatCurrency(data.price)}</Text>
                        <Text type="secondary"> /đêm</Text>
                    </div>
                    <Button type="primary">Đặt ngay</Button>
                </div>

                <div className="amenities">
                    {data.amenities.includes('wifi') && (
                        <Tag icon={<WifiOutlined />} color="blue">WiFi</Tag>
                    )}
                    {data.amenities.includes('parking') && (
                        <Tag icon={<CarOutlined />} color="blue">Chỗ đậu xe</Tag>
                    )}
                    {data.amenities.includes('kitchen') && (
                        <Tag icon={<RestOutlined />} color="blue">Bếp</Tag>
                    )}
                </div>
            </Card>
        </>

    );
};

export default HomestayCard;