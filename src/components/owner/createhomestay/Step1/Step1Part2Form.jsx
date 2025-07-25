import {
    AppstoreAddOutlined,
    DollarOutlined,
    EnvironmentOutlined,
    HomeOutlined,
    RestOutlined,
    UsergroupAddOutlined,
} from "@ant-design/icons";
import { Col, Form, InputNumber, Row, Select, Switch } from "antd";
import "./Step1Part2Form.css";

const { Option } = Select;

const Step1Part2Form = ({ data, setData, onNext, onBack }) => {
    const [form] = Form.useForm();

    const handleChange = (changedFields) => {
        setData({
            ...data,
            ...changedFields,
        });
    };

    const numberOptions = Array.from({ length: 20 }, (_, i) => i + 1);

    const formatCurrency = (value) => {
        if (!value) return "";
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const parseCurrency = (value) => {
        if (!value) return 0;
        return parseInt(value.toString().replace(/\D/g, ""), 10) || 0;
    };

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={data}
            onValuesChange={(_, allValues) => handleChange(allValues)}
            className="custom-step2-form"
        >
            <Row gutter={16}>
                <Col xs={24} md={12}>
                    <Form.Item
                        label="Giá theo ngày"
                        name="dailyPrice"
                        rules={[{ required: true, message: "Vui lòng nhập giá theo ngày" }]}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            min={1000}
                            step={5000}
                            addonAfter={<DollarOutlined />}
                            formatter={(value) =>
                                value ? `${formatCurrency(value)} VND` : ""
                            }
                            parser={(value) =>
                                parseCurrency(value)
                            }
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                    <Form.Item
                        label="Giá theo giờ"
                        name="hourlyPrice"
                        rules={[{ required: true, message: "Vui lòng nhập giá theo giờ" }]}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            min={1000}
                            step={5000}
                            addonAfter={<DollarOutlined />}
                            formatter={(value) =>
                                value ? `${formatCurrency(value)} VND` : ""
                            }
                            parser={(value) =>
                                parseCurrency(value)
                            }
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} md={12}>
                    <Form.Item
                        label="Nơi của bạn là"
                        name="type"
                        rules={[{ required: true, message: "Vui lòng chọn loại" }]}
                    >
                        <Select
                            placeholder="Chọn loại nơi ở"
                            suffixIcon={<HomeOutlined />}
                            allowClear
                        >
                            <Option value="homestay">Homestay</Option>
                            <Option value="hotel">Khách sạn</Option>
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                    <Form.Item
                        label="Xung quanh nhà bạn có gì"
                        name="typeStyle"
                        rules={[{ required: true, message: "Vui lòng chọn phong cách" }]}
                    >
                        <Select
                            placeholder="Chọn phong cách"
                            suffixIcon={<EnvironmentOutlined />}
                            allowClear
                        >
                            <Option value="Gần biển">Gần biển</Option>
                            <Option value="Cạnh rừng">Cạnh rừng</Option>
                            <Option value="Nằm ở trung tâm">Nằm ở trung tâm</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} md={12}>
                    <Form.Item
                        label="Cho phép thú cưng"
                        name="havePet"
                        valuePropName="checked"
                    >
                        <Switch checkedChildren="Có" unCheckedChildren="Không" />
                    </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                    <Form.Item
                        label="Số khách tối đa"
                        name="maxCustomer"
                        rules={[{ required: true, message: "Vui lòng chọn số khách" }]}
                    >
                        <Select
                            placeholder="Chọn số khách"
                            suffixIcon={<UsergroupAddOutlined />}
                            allowClear
                        >
                            {numberOptions.map((n) => (
                                <Option key={n} value={n}>
                                    {n} khách
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} md={12}>
                    <Form.Item
                        label="Số giường"
                        name="numberOfBeds"
                        rules={[{ required: true, message: "Chọn số giường" }]}
                    >
                        <Select
                            placeholder="Chọn số giường"
                            suffixIcon={<RestOutlined />}
                            allowClear
                        >
                            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                                <Option key={n} value={n}>
                                    {n} giường
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                    <Form.Item
                        label="Số phòng tắm"
                        name="numberOfBathrooms"
                        rules={[{ required: true, message: "Chọn số phòng tắm" }]}
                    >
                        <Select
                            placeholder="Chọn số phòng tắm"
                            suffixIcon={<AppstoreAddOutlined />}
                            allowClear
                        >
                            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                                <Option key={n} value={n}>
                                    {n} phòng tắm
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default Step1Part2Form;
