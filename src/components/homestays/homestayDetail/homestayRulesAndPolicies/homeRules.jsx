import { Button, Card, List, Typography } from "antd";
import { useState } from "react";

const { Title } = Typography;

const HouseRules = ({ rules }) => {
    const ruleItems = rules?.split(",").map((r) => r.trim()) || [];
    const [showAll, setShowAll] = useState(false);

    const displayedRules = showAll ? ruleItems : ruleItems.slice(0, 3);

    return (
        <Card title="Nội quy homestay" style={{ marginBottom: 24 }}>
            <List
                size="small"
                dataSource={displayedRules}
                renderItem={(item, idx) => (
                    <List.Item>
                        {idx + 1}. {item}
                    </List.Item>
                )}
            />
            {ruleItems.length > 3 && (
                <div style={{ textAlign: "center", marginTop: 12 }}>
                    <Button
                        type="link"
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ? "Ẩn bớt" : "Xem thêm"}
                    </Button>
                </div>
            )}
        </Card>
    );
};

export default HouseRules;