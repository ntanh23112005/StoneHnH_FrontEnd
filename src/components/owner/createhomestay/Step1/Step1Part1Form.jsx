import {
    EnvironmentOutlined,
    GlobalOutlined,
    HomeOutlined,
    PushpinOutlined,
} from "@ant-design/icons";
import { Col, Form, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
import "./Step1Part1Form.css";

const { Option } = Select;

const countryAreaMap = {
    "Việt Nam": [
        "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh",
        "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước", "Bình Thuận", "Cà Mau",
        "Cần Thơ", "Cao Bằng", "Đà Nẵng", "Đắk Lắk", "Đắk Nông", "Điện Biên",
        "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh",
        "Hải Dương", "Hải Phòng", "Hậu Giang", "Hòa Bình", "Hưng Yên", "Khánh Hòa",
        "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai",
        "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ",
        "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh",
        "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên",
        "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "TP. Hồ Chí Minh", "Trà Vinh",
        "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
    ],
    "Thái Lan": ["Bangkok", "Chiang Mai", "Phuket"],
    "Hàn Quốc": ["Seoul", "Busan", "Incheon"],
};

const Step1Part1Form = ({ data, setData, onNext, onBack }) => {
    const [form] = Form.useForm();
    const [selectedCountry, setSelectedCountry] = useState(data?.countryAddress || "");

    const handleChange = (changedFields) => {
        setData({
            ...data,
            ...changedFields,
        });
    };

    useEffect(() => {
        // Nếu đổi quốc gia, reset khu vực
        if (!countryAreaMap[selectedCountry]?.includes(data?.areaAddress)) {
            form.setFieldsValue({ areaAddress: undefined });
            setData({ ...data, areaAddress: undefined });
        }
    }, [selectedCountry]);

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={data}
            onValuesChange={(_, allValues) => handleChange(allValues)}
            className="custom-step1-form"
        >
            <Row gutter={16}>
                <Col xs={24} md={12}>
                    <Form.Item
                        label="Tên homestay"
                        name="homestayName"
                        rules={[{ required: true, message: "Vui lòng nhập tên homestay" }]}
                        tooltip="Tên sẽ hiển thị cho khách hàng"
                    >
                        <Input
                            prefix={<HomeOutlined />}
                            placeholder="Ví dụ: The Lake View Villa"
                            maxLength={50}
                            allowClear
                        />
                    </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                    <Form.Item
                        label="Quốc gia"
                        name="countryAddress"
                        rules={[{ required: true, message: "Vui lòng chọn quốc gia" }]}
                        tooltip="Quốc gia nơi homestay hoạt động"
                    >
                        <Select
                            placeholder="Chọn quốc gia"
                            onChange={(value) => setSelectedCountry(value)}
                            allowClear
                            suffixIcon={<GlobalOutlined />}
                        >
                            {Object.keys(countryAreaMap).map((country) => (
                                <Option key={country} value={country}>
                                    {country}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} md={12}>
                    <Form.Item
                        label="Khu vực"
                        name="areaAddress"
                        rules={[{ required: true, message: "Vui lòng chọn khu vực" }]}
                        tooltip="Tỉnh/Thành hoặc vùng cụ thể"
                    >
                        <Select
                            placeholder="Chọn khu vực"
                            disabled={!selectedCountry}
                            allowClear
                            suffixIcon={<EnvironmentOutlined />}
                        >
                            {(countryAreaMap[selectedCountry] || []).map((area) => (
                                <Option key={area} value={area}>
                                    {area}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                    <Form.Item
                        label="Địa chỉ chính xác"
                        name="detailAddress"
                        rules={[{ required: true, message: "Vui lòng nhập địa chỉ chi tiết" }]}
                        tooltip="Số nhà, đường, phường/xã..."
                    >
                        <Input
                            prefix={<PushpinOutlined />}
                            placeholder="Ví dụ: 123 Đường Trần Hưng Đạo, P.9"
                            maxLength={100}
                            allowClear
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default Step1Part1Form;