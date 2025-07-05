import { Card, List, Typography } from "antd";

const { Title } = Typography;

const SafetyInfo = ({ safetyItems }) => {
    const items =
        safetyItems?.trim()
            ? safetyItems.split(",").map((i) => i.trim())
            : ["Có camera phía trước"];

    return (
        <Card
            style={{
                marginBottom: 24,
                borderRadius: 16,
                border: "1px solid #f0f0f0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                padding: 16,
            }}
            title={
                <span style={{ fontSize: 18, fontWeight: 600, color: "#4266b3" }}>
                    Thông tin an toàn
                </span>
            }
        >
            <List
                dataSource={items}
                renderItem={(item, idx) => (
                    <List.Item style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <span style={{ color: "#4266b3", fontWeight: 500, marginRight: 8 }}>
                            {idx + 1}.
                        </span>
                        {item}
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default SafetyInfo;
