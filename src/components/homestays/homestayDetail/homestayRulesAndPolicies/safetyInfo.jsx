import { Card, List, Typography } from "antd";

const { Text } = Typography;

const SafetyInfo = ({ safetyItems }) => {
    const items =
        safetyItems?.trim()
            ? safetyItems.split(",").map((i) => i.trim())
            : ["Có camera phía trước"];

    return (
        <Card title="Thông tin an toàn" style={{ marginBottom: 24 }}>
            <List
                size="small"
                dataSource={items}
                renderItem={(item, idx) => <List.Item>{idx + 1}. {item}</List.Item>}
            />
        </Card>
    );
};

export default SafetyInfo;