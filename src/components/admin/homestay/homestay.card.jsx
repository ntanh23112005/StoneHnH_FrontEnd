import {
    CarOutlined,
    EnvironmentOutlined,
    RestOutlined,
    UserOutlined,
    WifiOutlined
} from '@ant-design/icons';
import { Button, Card, Spin, Tag, Typography } from 'antd';
import { useContext, useState } from 'react';
import HomestayDetailModal from '../../../pages/admin/homestay.management.detail';
import { AuthContext } from '../../context/auth.context';
import './HomestayCard.css';

const { Title, Text } = Typography;

const HomestayCard = ({ data }) => {

    const [homestays, setHomestays] = useState([]);
    const [loading, setLoading] = useState(false);

    const [selectedId, setSelectedId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleOpenModal = (id) => {
        setSelectedId(id);
        setModalVisible(true);
    };


    const VITE_IMG_BACKEND_URL = import.meta.env.VITE_IMG_BACKEND_URL;

    // const listImg = Array.isArray(data.images)
    //     ? data.images.flatMap(i =>
    //         i.homestayImage.split(",").map(s => s.trim())
    //     )
    //     : [];

    const listImg = typeof data.imageList === 'string'
    ? data.imageList.split(',').map(s => s.trim())
    : [];

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

    const equipments = Array.isArray(data.supportEquipments)
        ? data.supportEquipments
        : (data.supportEquipments || "").split(",").map(s => s.trim());

    const handleStatusUpdate = (newStatus) => {
        data.status = newStatus;
        setHomestays(prev =>
            prev.map(h => h.homestayId === data.homestayId ? { ...h, status: newStatus } : h)
        );
    };

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
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Tag color={data.status ? "green" : "red"}>
                        {data.status ? "Đã duyệt" : "Chưa duyệt"}
                    </Tag>
                    <Button
                        type="primary"
                        onClick={() => {
                            setSelectedId(data.homestayId);
                            setModalVisible(true);
                        }}
                        style={{
                            backgroundColor: data.status ? "#52c41a" : "#fa8c16",
                            borderColor: data.status ? "#52c41a" : "#fa8c16",
                        }}
                    >
                        {data.status ? "Hủy duyệt" : "Duyệt"}
                    </Button>
                </div>
            </div>

            <div>
                {loading ? (
                    <Spin />
                ) : (
                    <div className="grid">
                        {homestays.map(item => (
                            <HomestayCard
                                key={item.homestayId}
                                data={item}
                                onOpenDetail={handleOpenModal}
                            />
                        ))}
                    </div>
                )}
                <HomestayDetailModal
                    id={selectedId}
                    open={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onSuccess={handleStatusUpdate}
                />
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