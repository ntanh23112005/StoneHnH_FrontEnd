import {
    ApartmentOutlined,
    BgColorsOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    UserOutlined
} from "@ant-design/icons";
import { Card, Tag, Typography } from "antd";
import "./homestayDetail.css";

const { Text } = Typography;

const HomestaySummary = ({
    maxCustomer,
    numberOfBeds,
    numberOfBathrooms,
    havePet,
    options = ""
}) => {
    const optionsList = options.split(",").map((opt) => opt.trim());

    return (
        <Card
            className="homestay-summary-card"
            bordered={false}
            title={<span className="summary-title">Thông tin tổng quan</span>}
        >
            <div className="summary-main-info">
                <div className="summary-info-item">
                    <UserOutlined className="summary-icon" />
                    <Text>{maxCustomer} khách</Text>
                </div>
                <div className="summary-info-item">
                    <ApartmentOutlined className="summary-icon" />
                    <Text>{numberOfBeds} giường</Text>
                </div>
                <div className="summary-info-item">
                    <BgColorsOutlined className="summary-icon" />
                    <Text>{numberOfBathrooms} phòng tắm</Text>
                </div>
                <div className="summary-info-item">
                    {havePet ? (
                        <Tag icon={<CheckCircleOutlined />} color="success">
                            Cho phép thú cưng
                        </Tag>
                    ) : (
                        <Tag icon={<CloseCircleOutlined />} color="error">
                            Không thú cưng
                        </Tag>
                    )}
                </div>
            </div>

            <div className="summary-tags">
                {optionsList.map((opt, idx) => (
                    <Tag key={idx} color="blue">
                        {opt}
                    </Tag>
                ))}
            </div>
        </Card>
    );
};

export default HomestaySummary;