import { EnvironmentOutlined, PictureOutlined } from "@ant-design/icons";
import { Button, Col, Image, Modal, Row, Typography } from "antd";
import { useState } from "react";

const { Title, Text } = Typography;

const HomestayHeader = ({ name, location, price, images = [] }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!Array.isArray(images) || images.length === 0) {
        return <Text type="danger">Không có hình ảnh để hiển thị</Text>;
    }

    const safeName = encodeURIComponent(name);
    const getImagePath = (fileName) => `/images/HomeStay/${safeName}/${fileName}`;

    const mainImage = images[0];
    const smallImages = images.slice(1, 5);

    return (
        <div style={{ marginBottom: 32 }}>
            <Title level={2} style={{ marginBottom: 4 }}>
                {name}
            </Title>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <EnvironmentOutlined style={{ color: "#4266b3" }} />
                <Text type="secondary">{location}</Text>
            </div>
            <Text strong style={{ fontSize: 18, color: "#4266b3" }}>
                {price.toLocaleString("vi-VN")}₫ / đêm
            </Text>

            <Image.PreviewGroup>
                <Row gutter={16} style={{ marginTop: 16 }}>
                    <Col span={12}>
                        <Image
                            src={getImagePath(mainImage)}
                            alt={`Ảnh chính của ${name}`}
                            width="100%"
                            height={400}
                            style={{
                                objectFit: "cover",
                                borderRadius: 12,
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            }}
                        />
                    </Col>
                    <Col span={12}>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gridTemplateRows: "1fr 1fr",
                                gap: 8,
                                height: 400,
                            }}
                        >
                            {smallImages.map((img, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        position: "relative",
                                        width: "100%",
                                        height: "100%",
                                        overflow: "hidden",
                                        borderRadius: 8,
                                    }}
                                >
                                    <Image
                                        src={getImagePath(img)}
                                        alt={`Ảnh nhỏ ${idx + 1}`}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            borderRadius: 8,
                                        }}
                                    />
                                    {idx === 3 && (
                                        <div
                                            onClick={() => setIsModalOpen(true)}
                                            style={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                width: "100%",
                                                height: "100%",
                                                backgroundColor: "rgba(0,0,0,0.5)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                cursor: "pointer",
                                                borderRadius: 8,
                                                transition: "background-color 0.3s",
                                            }}
                                        >
                                            <Button
                                                icon={<PictureOutlined />}
                                                size="large"
                                                style={{
                                                    backgroundColor: "#ffffff",
                                                    color: "#4266b3",
                                                    border: "1px solid #4266b3",
                                                    fontWeight: 500,
                                                }}
                                            >
                                                Xem tất cả {images.length} ảnh
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Image.PreviewGroup>

            <Modal
                title={<span style={{ color: "#4266b3" }}>Tất cả ảnh Homestay</span>}
                open={isModalOpen}
                footer={null}
                onCancel={() => setIsModalOpen(false)}
                width={1000}
            >
                <Row gutter={[12, 12]}>
                    {images.map((img, idx) => (
                        <Col key={idx} xs={12} sm={8} md={6} lg={6} xl={6}>
                            <Image
                                src={getImagePath(img)}
                                alt={`Ảnh ${idx + 1}`}
                                width="100%"
                                style={{
                                    borderRadius: 8,
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                }}
                            />
                        </Col>
                    ))}
                </Row>
            </Modal>
        </div>
    );
};

export default HomestayHeader;
