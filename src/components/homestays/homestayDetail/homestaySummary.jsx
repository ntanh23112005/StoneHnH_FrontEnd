import {
    FaUserFriends,
    FaBed,
    FaBath,
    FaDog,
    FaTimesCircle,
} from "react-icons/fa";
import { Card, Tag, Typography } from "antd";
import "./homestayDetail.css";

const { Text } = Typography;

const HomestaySummary = ({
    maxCustomer,
    numberOfBeds,
    numberOfBathrooms,
    havePet,
    options = "",
}) => {
    const optionsList = options
        .split(",")
        .map((opt) => opt.trim())
        .filter((x) => x);

    return (
        <Card
            style={{
                borderRadius: "16px",
                border: "1px solid #e0e0e0",
                padding: "24px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
            title={
                <span
                    style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#4266b3",
                    }}
                >
                    Thông tin tổng quan
                </span>
            }
        >
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    marginBottom: "16px",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <FaUserFriends color="#4266b3" size={20} />
                    <Text>{maxCustomer} khách</Text>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <FaBed color="#4266b3" size={20} />
                    <Text>{numberOfBeds} giường</Text>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <FaBath color="#4266b3" size={20} />
                    <Text>{numberOfBathrooms} phòng tắm</Text>
                </div>
                <div>
                    {havePet ? (
                        <Tag
                            icon={<FaDog />}
                            color="success"
                            style={{ borderRadius: "8px", padding: "4px 8px" }}
                        >
                            Cho phép thú cưng
                        </Tag>
                    ) : (
                        <Tag
                            icon={<FaTimesCircle />}
                            color="error"
                            style={{ borderRadius: "8px", padding: "4px 8px" }}
                        >
                            Không thú cưng
                        </Tag>
                    )}
                </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {optionsList.map((opt, idx) => (
                    <Tag
                        key={idx}
                        color="#4266b3"
                        style={{ borderRadius: "8px", padding: "4px 12px" }}
                    >
                        {opt}
                    </Tag>
                ))}
            </div>
        </Card>
    );
};

export default HomestaySummary;
