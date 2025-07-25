import { Col, Form, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";

const { Option } = Select;

const defaultRules = [
    "Không hút thuốc trong phòng",
    "Không mang vật nuôi",
    "Không gây ồn sau 22h",
    "Giữ gìn vệ sinh chung",
];

const defaultPolicies = [
    "Hủy miễn phí trước 24 giờ",
    "Nhận phòng sau 14:00",
    "Trả phòng trước 12:00",
    "Không hoàn tiền sau khi đặt",
];

const Step2RulesForm = ({ data, setData, onBack, onNext }) => {
    const [form] = Form.useForm();
    const [customRule, setCustomRule] = useState("");
    const [customPolicy, setCustomPolicy] = useState("");

    const handleChange = ({ rules, policies }) => {
        const ruleText = [...(rules || []), customRule].filter(Boolean).join(", ");
        const policyText = [...(policies || []), customPolicy].filter(Boolean).join(", ");
        setData({ ...data, ruleText, policyText });
    };

    const handleNext = () => {
        form.validateFields().then(() => onNext());
    };

    useEffect(() => {
        const ruleArray = data.ruleText?.split(",").map(s => s.trim()) || [];
        const policyArray = data.policyText?.split(",").map(s => s.trim()) || [];

        form.setFieldsValue({
            rules: ruleArray.filter(r => defaultRules.includes(r)),
            policies: policyArray.filter(p => defaultPolicies.includes(p)),
        });

        setCustomRule(ruleArray.find(r => !defaultRules.includes(r)) || "");
        setCustomPolicy(policyArray.find(p => !defaultPolicies.includes(p)) || "");
    }, [data]);

    return (
        <Form
            form={form}
            layout="vertical"
            onValuesChange={(_, all) => handleChange(all)}
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label="Nội quy homestay"
                        name="rules"
                        rules={[{ required: true, message: "Vui lòng chọn nội quy" }]}
                    >
                        <Select mode="multiple" placeholder="Chọn nội quy" allowClear>
                            {defaultRules.map(rule => (
                                <Option key={rule} value={rule}>{rule}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Thêm nội quy khác (nếu có)">
                        <Input
                            value={customRule}
                            onChange={(e) => {
                                setCustomRule(e.target.value);
                                handleChange(form.getFieldsValue());
                            }}
                            placeholder="VD: Không mang thức ăn từ ngoài vào"
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label="Chính sách homestay"
                        name="policies"
                        rules={[{ required: true, message: "Vui lòng chọn chính sách" }]}
                    >
                        <Select mode="multiple" placeholder="Chọn chính sách" allowClear>
                            {defaultPolicies.map(policy => (
                                <Option key={policy} value={policy}>{policy}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Thêm chính sách khác (nếu có)">
                        <Input
                            value={customPolicy}
                            onChange={(e) => {
                                setCustomPolicy(e.target.value);
                                handleChange(form.getFieldsValue());
                            }}
                            placeholder="VD: Thú cưng phải có chuồng riêng..."
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default Step2RulesForm;