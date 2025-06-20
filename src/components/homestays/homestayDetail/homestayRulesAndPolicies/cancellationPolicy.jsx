import { Button, Card, List, Typography } from "antd";
import { useState } from "react";

const { Title } = Typography;

const CancellationPolicy = ({ policy }) => {
    const policyItems = policy?.split(",").map((p) => p.trim()) || [];
    const [showAll, setShowAll] = useState(false);

    const displayedPolicies = showAll ? policyItems : policyItems.slice(0, 3);

    return (
        <Card title="Chính sách huỷ phòng" style={{ marginBottom: 24 }}>
            <List
                size="small"
                dataSource={displayedPolicies}
                renderItem={(item, idx) => (
                    <List.Item>
                        {idx + 1}. {item}
                    </List.Item>
                )}
            />
            {policyItems.length > 3 && (
                <div style={{ textAlign: "center", marginTop: 12 }}>
                    <Button type="link" onClick={() => setShowAll(!showAll)}>
                        {showAll ? "Ẩn bớt" : "Xem thêm"}
                    </Button>
                </div>
            )}
        </Card>
    );
};

export default CancellationPolicy;