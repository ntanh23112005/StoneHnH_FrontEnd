import {
    CarOutlined,
    EnvironmentOutlined,
    RestOutlined,
    UserOutlined,
    WifiOutlined
} from '@ant-design/icons';
import { Card, Tag, Typography } from 'antd';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import './HomestayCard.css';

const { Title, Text } = Typography;

const HomestayCard = ({ data }) => {
    const { showBeforeTax } = useContext(AuthContext);

    const VITE_IMG_BACKEND_URL = import.meta.env.VITE_IMG_BACKEND_URL;

    const listImg = Array.isArray(data.images)
        ? data.images
        : [];

    let finalPrice = data.dailyPrice;
    if (showBeforeTax === true) {
        finalPrice = data.dailyPrice * 0.92;
    }

    const formatCurrency = (number) => {
        return number.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND'
        });
    };

    const equipments = Array.isArray(data.supportEquipments)
        ? data.supportEquipments
        : (data.supportEquipments || "").split(",").map(s => s.trim());

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