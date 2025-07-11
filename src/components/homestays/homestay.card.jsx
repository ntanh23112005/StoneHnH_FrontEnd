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

const HomestayCard = ({ data }) => {

    const VITE_IMG_BACKEND_URL = import.meta.env.VITE_IMG_BACKEND_URL;

    const [liked, setLiked] = useState(true);

    const listImg = (data.imageList).split(',');

    const { showBeforeTax } = useContext(AuthContext);

    // Take finalPrice on toggle show tax
    let finalPrice = data.dailyPrice;
    if (showBeforeTax === true) {
        finalPrice = data.dailyPrice * 0.92
    } else {
        finalPrice = data.dailyPrice
    }

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
                            alt={data.areaAddress}
                            src={`${VITE_IMG_BACKEND_URL}/HomeStay/${data.homestayName}/${listImg[0]}`}
                            className="cover-image"
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault();       // Ngăn chuyển trang
                                e.stopPropagation();// Ngăn sự kiện lan ra thẻ Link
                                setLiked(!liked)
                            }}
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
                            <span className="rating-text">{data.averageRate}</span>
                        </div>
                    </div>
                }
            >
                <div className="top-info">
                    <Title level={5} className="title">{data.homestayName}</Title>
                    <div className="location">
                        <EnvironmentOutlined className="icon" />
                        {data.areaAddress.split(', Việt Nam')}
                    </div>
                </div>

                <Text type="secondary" className="description">
                    <UserOutlined className="icon" />
                    {data.maxCustomer} người - {data.numberOfBathrooms} Phòng tắm - {data.numberOfBathrooms} Phòng ngủ
                </Text>

                <div className="price-book">
                    <div>
                        <Text type="secondary">Giá từ </Text>
                        <Text strong className="price">{formatCurrency(finalPrice)}/Ngày</Text>
                    </div>
                    <Button style={{ backgroundColor: '#4266b3', color: 'white' }}>Đặt ngay</Button>
                </div>

                <div className="amenities">
                    {data.supportEquipments.includes('wifi') && (
                        <Tag icon={<WifiOutlined />} color="blue">WiFi</Tag>
                    )}
                    {data.supportEquipments.includes('parking') && (
                        <Tag icon={<CarOutlined />} color="blue">Chỗ đậu xe</Tag>
                    )}
                    {data.supportEquipments.includes('kitchen') && (
                        <Tag icon={<RestOutlined />} color="blue">Bếp</Tag>
                    )}
                </div>
            </Card>
        </>
    );
};

export default HomestayCard;