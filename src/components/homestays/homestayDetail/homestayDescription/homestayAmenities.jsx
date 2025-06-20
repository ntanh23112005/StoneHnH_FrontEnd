import {
    CarOutlined,
    CheckCircleOutlined,
    CoffeeOutlined,
    FireOutlined,
    GiftOutlined,
    WifiOutlined
} from "@ant-design/icons";
import { Card, Space, Tag, Typography } from "antd";

const { Title } = Typography;

const HomestayAmenities = ({ conveniences = "", supportEquipments = "" }) => {
    const convenienceList = conveniences.split(",").map((item) => item.trim());
    const equipmentList = supportEquipments.split(",").map((item) => item.trim());

    // Hàm dịch từ tiếng Anh -> tiếng Việt
    const translateLabel = (text) => {
        const map = {
            wifi: "Wi-Fi",
            kitchen: "Bếp",
            parking: "Chỗ đậu xe",
            gym: "Phòng gym",
            "hot tub": "Bồn nước nóng",
            breakfast: "Bữa sáng",
            pool: "Bể bơi",
            smoking: "Cho phép hút thuốc",
        };

        const lower = text.trim().toLowerCase();
        return map[lower] || text; // nếu không có thì giữ nguyên
    };

    // Gán icon theo nội dung
    const getIcon = (name) => {
        const lower = name.toLowerCase();

        if (lower.includes("wifi")) return <WifiOutlined />;
        if (lower.includes("bếp") || lower.includes("kitchen")) return <CoffeeOutlined />;
        if (lower.includes("hồ bơi") || lower.includes("bể bơi") || lower.includes("pool")) return <FireOutlined />;
        if (
            lower.includes("xe") ||
            lower.includes("chỗ đậu xe") ||
            lower.includes("đậu xe") ||
            lower.includes("parking")
        )
            return <CarOutlined />;
        if (lower.includes("hút thuốc") || lower.includes("thuốc") || lower.includes("smoking")) return <GiftOutlined />;

        return <CheckCircleOutlined />;
    };

    return (
        <Card title="Tiện nghi & Thiết bị hỗ trợ" style={{ marginBottom: 32 }}>
            <Title level={5}>Tiện nghi nổi bật</Title>
            <Space wrap>
                {convenienceList.map((item, index) => (
                    <Tag icon={getIcon(item)} color="green" key={index}>
                        {translateLabel(item)}
                    </Tag>
                ))}
            </Space>

            <Title level={5} style={{ marginTop: 24 }}>Thiết bị hỗ trợ</Title>
            <Space wrap>
                {equipmentList.map((item, index) => (
                    <Tag icon={getIcon(item)} color="blue" key={index}>
                        {translateLabel(item)}
                    </Tag>
                ))}
            </Space>
        </Card>
    );
};

export default HomestayAmenities;