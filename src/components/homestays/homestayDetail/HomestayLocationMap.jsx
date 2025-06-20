import { Card, Typography } from "antd";

const { Title, Text } = Typography;

const HomestayLocationMap = ({ address, area }) => {
    const fullAddress = `${address}, ${area}`;

    // Google Maps Embed (dùng address -> encoded)
    const mapSrc = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(
        fullAddress
    )}`;

    return (
        <Card title="Vị trí Homestay" style={{ marginBottom: 32 }}>
            <Title level={5}>Địa chỉ</Title>
            <Text>{fullAddress}</Text>

            <div style={{ marginTop: 16 }}>
                <iframe
                    title="Homestay Location"
                    width="100%"
                    height="400"
                    frameBorder="0"
                    style={{ border: 0, borderRadius: 8 }}
                    src={mapSrc}
                    allowFullScreen
                    loading="lazy"
                ></iframe>
            </div>
        </Card>
    );
};

export default HomestayLocationMap;