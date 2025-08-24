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
import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import './HomestayCard.css';

const { Title, Text } = Typography;

const HomestayCard = ({ data, showHeart = true, showRating = true, showBookingButton = true }) => {

    const VITE_IMG_BACKEND_URL = import.meta.env.VITE_IMG_BACKEND_URL;

    const [liked, setLiked] = useState(true);

    const listImg = data.imageList ? data.imageList.split(',') : [];

    const { showBeforeTax } = useContext(AuthContext);

    let finalPrice = data.dailyPrice;
    if (showBeforeTax === true) {
        finalPrice = data.dailyPrice * 0.92;
    } else {
        finalPrice = data.dailyPrice;
    }

    const formatCurrency = (number) => {
        return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    // Đảm bảo supportEquipments là mảng
    const equipments = Array.isArray(data.supportEquipments)
        ? data.supportEquipments
        : (data.supportEquipments || "").split(",");

    return (
        <Card
            hoverable
            className="homestay-card"
            cover={
                <div className="cover-container">
                    <img
                        alt={data.areaAddress}
                        src={`${VITE_IMG_BACKEND_URL}/HomeStay/${data.homestayName}/${listImg[0] || "default.jpg"}`}
                        className="cover-image"
                    />
                    {showHeart && (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setLiked(!liked);
                            }}
                            className="heart-button"
                        >
                            {liked ? (
                                <HeartFilled className="text-red" />
                            ) : (
                                <HeartOutlined className="text-gray" />
                            )}
                        </button>
                    )}
                    {showRating && (
                        <div className="rating-badge">
                            <StarFilled className="text-yellow" />
                            <span className="rating-text">{data.averageRate?.toFixed(1)}</span>
                        </div>
                    )}
                </div>
            }

        >
            <div className="top-info">
                <Title level={5} className="title">{data.homestayName}</Title>
                <div className="location">
                    <EnvironmentOutlined className="icon" />
                    {data.areaAddress?.split(', Việt Nam')[0]}
                </div>
            </div>

            <Text type="secondary" className="description">
                <UserOutlined className="icon" />
                {data.maxCustomer} người - {data.numberOfBathrooms} Phòng tắm - {data.numberOfBeds} Phòng ngủ
            </Text>

            <div className="price-book">
                <div>
                    <Text type="secondary">Giá từ </Text>
                    <Text strong className="price">{formatCurrency(finalPrice)}/Ngày</Text>
                </div>
                {showBookingButton && (
                    <Button style={{ backgroundColor: '#4266b3', color: 'white' }}>Đặt ngay</Button>
                )}
            </div>

            <div className="amenities">
                {equipments.includes('wifi') && (
                    <Tag icon={<WifiOutlined />} color="blue">WiFi</Tag>
                )}
                {equipments.includes('parking') && (
                    <Tag icon={<CarOutlined />} color="blue">Chỗ đậu xe</Tag>
                )}
                {equipments.includes('kitchen') && (
                    <Tag icon={<RestOutlined />} color="blue">Bếp</Tag>
                )}
            </div>
        </Card>
    );
};

export default HomestayCard;