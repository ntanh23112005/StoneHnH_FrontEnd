import { StarFilled } from "@ant-design/icons";
import { Card, Col, Rate, Row, Typography } from "antd";

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
        <Card title="Tổng quan đánh giá" style={{ marginBottom: 24 }}>
            {/* Đánh giá trung bình với icon sao */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <StarFilled style={{ fontSize: 24, color: "#fadb14" }} />
                <Title level={4} style={{ margin: 0 }}>
                    {rate.averageRate.toFixed(1)} / 5
                </Title>
            </div>

            <Rate allowHalf disabled value={rate.averageRate} style={{ fontSize: 20, color: "#faad14" }} />
            <div style={{ marginTop: 4, marginBottom: 12 }}>
                <Text type="secondary">{rate.rateTitle}</Text>
            </div>

            {/* Từng mục đánh giá chi tiết */}
            <Row gutter={[16, 16]}>
                {categories.map((cat, idx) => (
                    <Col span={12} key={idx}>
                        <Text>{cat.label}</Text>
                        <div>
                            <Rate allowHalf disabled value={cat.value} style={{ color: "#1890ff" }} />
                            <Text type="secondary" style={{ marginLeft: 8 }}>
                                {cat.value} / 5
                            </Text>
                        </div>
                    </Col>
                ))}
            </Row>
        </Card>
    );
};

export default HomestayRatingSummary;