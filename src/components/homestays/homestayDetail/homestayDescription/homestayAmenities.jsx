import {
    CarOutlined,
    CheckCircleOutlined,
} from "@ant-design/icons";
import { Card, Typography } from "antd";
import { FaWifi, FaSwimmingPool, FaSmoking, FaUtensils, FaParking, FaDumbbell, FaHotTub, FaBed } from "react-icons/fa";
import { MdPets } from "react-icons/md";
import { GiCoffeeCup, GiBroom } from "react-icons/gi";
import { IoIosWine } from "react-icons/io";
import { Space } from "antd";

const { Title } = Typography;

const HomestayAmenities = ({ conveniences = "", supportEquipments = "" }) => {
    const convenienceList = conveniences
        .split(",")
        .map((item) => item.trim())
        .filter((i) => i);

    const equipmentList = supportEquipments
        .split(",")
        .map((item) => item.trim())
        .filter((i) => i);

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
            pet: "Cho thú cưng",
            balcony: "Ban công",
            quiet: "Yên tĩnh",
            view: "View đẹp",
        };

        const lower = text.trim().toLowerCase();
        return map[lower] || text;
    };

    // Các icon của react-icons
    const getNiceIcon = (name) => {
        const lower = name.toLowerCase();

        if (lower.includes("wifi")) return <FaWifi />;
        if (lower.includes("bếp") || lower.includes("kitchen")) return <FaUtensils />;
        if (lower.includes("hồ bơi") || lower.includes("bể bơi") || lower.includes("pool"))
            return <FaSwimmingPool />;
        if (
            lower.includes("xe") ||
            lower.includes("chỗ đậu xe") ||
            lower.includes("parking")
        )
            return <FaParking />;
        if (
            lower.includes("hút thuốc") ||
            lower.includes("thuốc") ||
            lower.includes("smoking")
        )
            return <FaSmoking />;
        if (lower.includes("gym")) return <FaDumbbell />;
        if (lower.includes("bồn nước nóng") || lower.includes("hot tub"))
            return <FaHotTub />;
        if (lower.includes("thú cưng") || lower.includes("pet")) return <MdPets />;
        if (lower.includes("ban công")) return <IoIosWine />;
        if (lower.includes("yên tĩnh") || lower.includes("quiet")) return <GiCoffeeCup />;
        if (lower.includes("view")) return <GiBroom />;

        return <CheckCircleOutlined />;
    };

    return (
        <Card
            style={{
                marginBottom: 32,
                borderRadius: 16,
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                border: "1px solid #f0f0f0",
                padding: 16,
            }}
            title={
                <span style={{ fontSize: 18, fontWeight: 600, color: "#4266b3" }}>
                    Tiện nghi & Thiết bị hỗ trợ
                </span>
            }
        >
            {/* Tiện nghi nổi bật */}
            <Title level={5} style={{ color: "#4266b3" }}>
                Tiện nghi nổi bật
            </Title>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "12px",
                }}
            >
                {convenienceList.length ? (
                    convenienceList.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                background: "#eaf0fb",
                                borderRadius: "8px",
                                padding: "8px 12px",
                                minWidth: "140px",
                                color: "#4266b3",
                                fontWeight: 500,
                            }}
                        >
                            <span style={{ fontSize: "18px" }}>{getNiceIcon(item)}</span>
                            <span>{translateLabel(item)}</span>
                        </div>
                    ))
                ) : (
                    <div>Không có thông tin</div>
                )}
            </div>

            {/* Thiết bị hỗ trợ */}
            <Title level={5} style={{ marginTop: 24, color: "#4266b3" }}>
                Thiết bị hỗ trợ
            </Title>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "12px",
                }}
            >
                {equipmentList.length ? (
                    equipmentList.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                background: "#f5f7fb",
                                borderRadius: "8px",
                                padding: "8px 12px",
                                minWidth: "140px",
                                color: "#4266b3",
                                fontWeight: 500,
                            }}
                        >
                            <span style={{ fontSize: "18px" }}>
                                {getNiceIcon(item)}
                            </span>
                            <span>{translateLabel(item)}</span>
                        </div>
                    ))
                ) : (
                    <div>Không có thông tin</div>
                )}
            </div>
        </Card>
    );
};

export default HomestayAmenities;
