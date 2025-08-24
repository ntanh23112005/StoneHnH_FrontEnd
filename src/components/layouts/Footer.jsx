import { FacebookFilled, InstagramFilled, YoutubeFilled } from "@ant-design/icons";
import { Row, Col, Typography } from "antd";
import "./footer.css";

const { Title, Text, Link } = Typography;

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-content">
                <Row gutter={[32, 32]}>
                    <Col xs={24} md={8}>
                        <Title level={5} className="footer-title">
                            Về chúng tôi
                        </Title>
                        <Text className="footer-text">
                            Nền tảng đặt Homestay tiện lợi và uy tín, mang đến trải nghiệm lưu trú tuyệt vời.
                        </Text>
                    </Col>

                    <Col xs={24} md={8}>
                        <Title level={5} className="footer-title">
                            Hỗ trợ
                        </Title>
                        <div className="footer-links">
                            <Link>Trung tâm trợ giúp</Link>
                            <Link>Chính sách hoàn tiền</Link>
                            <Link>Điều khoản sử dụng</Link>
                        </div>
                    </Col>

                    <Col xs={24} md={8}>
                        <Title level={5} className="footer-title">
                            Kết nối với chúng tôi
                        </Title>
                        <div className="footer-socials">
                            <FacebookFilled className="footer-icon" />
                            <InstagramFilled className="footer-icon" />
                            <YoutubeFilled className="footer-icon" />
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="footer-bottom">
                <Text type="secondary">© {new Date().getFullYear()} Bản quyền được phát triển bởi StoneCoding</Text>
            </div>
        </div>
    );
};

export default Footer;
