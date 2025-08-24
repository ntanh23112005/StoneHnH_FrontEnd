import { Button, Card, List, Typography } from "antd";
import { useState } from "react";

const { Title } = Typography;

const CancellationPolicy = ({ policy }) => {
    const policyItems = policy?.split(",").map((p) => p.trim()) || [];
    const [showAll, setShowAll] = useState(false);

    const displayedPolicies = showAll ? policyItems : policyItems.slice(0, 3);

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
                    Chính sách huỷ phòng
                </span>
            }
        >
            <List
                dataSource={displayedPolicies}
                renderItem={(item, idx) => (
                    <List.Item style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <span style={{ color: "#4266b3", fontWeight: 500, marginRight: 8 }}>
                            {idx + 1}.
                        </span>
                        {item}
                    </List.Item>
                )}
            />
            {policyItems.length > 3 && (
                <div style={{ textAlign: "center", marginTop: 12 }}>
                    <Button
                        type="link"
                        onClick={() => setShowAll(!showAll)}
                        style={{ color: "#4266b3" }}
                    >
                        {showAll ? "Ẩn bớt" : "Xem thêm"}
                    </Button>
                </div>
            )}
        </Card>
    );
};

export default CancellationPolicy;
