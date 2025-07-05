import { StarFilled } from "@ant-design/icons";
import { Card, Row, Col, Typography, Progress } from "antd";

const { Title, Text } = Typography;

const HomestayRatingSummary = ({ rate }) => {
    if (!rate) return null;

    const categories = [
        { label: "Giá cả", value: rate.price },
        { label: "Vị trí", value: rate.location },
        { label: "Giao tiếp", value: rate.communication },
        { label: "Đúng mô tả", value: rate.exactly },
        { label: "Vệ sinh", value: rate.cleanlinessLevel },
    ];

    return (
        <Card
            style={{
                marginBottom: 24,
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                border: "1px solid #f0f0f0",
            }}
        >
            {/* Tổng điểm trung bình */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: 24,
                }}
            >
                <Title
                    level={1}
                    style={{
                        margin: "4px 0",
                        fontSize: "36px",
                        fontWeight: "700",
                        lineHeight: "1",
                    }}
                >
                    {rate.averageRate.toFixed(1)}
                    <span style={{ fontSize: "20px", fontWeight: "400", marginRight: "20px" }}> / 5</span>
                    <StarFilled style={{ fontSize: 32, color: "#fadb14" }} />
                </Title>
                <Text type="secondary">{rate.rateTitle}</Text>
            </div>

            {/* Các mục đánh giá chi tiết */}
            <Row gutter={[16, 16]}>
                {categories.map((cat, idx) => (
                    <Col xs={24} sm={12} key={idx}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Text>{cat.label}</Text>
                            <Text style={{ fontWeight: 500 }}>{cat.value.toFixed(1)}</Text>
                        </div>
                        <Progress
                            percent={cat.value * 20}
                            showInfo={false}
                            strokeColor="#4266b3" // Màu xanh đậm
                            trailColor="#f5f5f5"
                        />
                    </Col>
                ))}
            </Row>
        </Card>
    );
};

export default HomestayRatingSummary;
