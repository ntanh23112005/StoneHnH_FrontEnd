import {
    CarOutlined,
    CheckCircleOutlined,
    FileDoneOutlined,
    HomeOutlined,
    RestOutlined,
    ToolOutlined,
} from "@ant-design/icons";
import {
    Col,
    Form,
    Input,
    Row,
    Select,
    Switch,
} from "antd";

const { TextArea } = Input;
const { Option } = Select;

const conveniencesOptions = [
    "Wi-Fi",
    "TV",
    "Máy lạnh",
    "Máy giặt",
    "Bếp",
    "Ban công",
    "Hồ bơi",
];

const supportEquipmentOptions = [
    "Máy sấy tóc",
    "Bàn ủi",
    "Tủ lạnh",
    "Ấm siêu tốc",
    "Lò vi sóng",
    "Máy pha cà phê",
];

const optionsPolicies = [
    "Hủy miễn phí trước 24 giờ",
    "Nhận phòng sau 14:00",
    "Trả phòng trước 12:00",
    "Không hoàn tiền sau khi đặt",
];

const Step1Part3Form = ({ data, setData, onBack, onNext }) => {
    const [form] = Form.useForm();

    // Convert string back to array for display when editing
    const transformInitialValues = {
        ...data,
        conveniences: data.conveniences?.split(",").filter(Boolean) || [],
        options: data.options?.split(",").filter(Boolean) || [],
        supportEquipments: data.supportEquipments?.split(",").filter(Boolean) || [],
    };

    const handleChange = (_, allValues) => {
        // Convert selected arrays to comma-separated strings
        const transformed = { ...allValues };

        ["conveniences", "options", "supportEquipments"].forEach((key) => {
            if (Array.isArray(transformed[key])) {
                transformed[key] = transformed[key].join(",");
            }
        });

        setData({
            ...data,
            ...transformed,
        });
    };

    const handleNext = () => {
        form.validateFields().then(() => {
            onNext();
        });
    };

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={transformInitialValues}
            onValuesChange={handleChange}
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label={
                            <>
                                <CheckCircleOutlined style={{ marginRight: 8 }} />
                                Tiện nghi
                            </>
                        }
                        name="conveniences"
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            placeholder="Chọn tiện nghi"
                            options={conveniencesOptions.map((item) => ({
                                label: item,
                                value: item,
                            }))}
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label={
                            <>
                                <FileDoneOutlined style={{ marginRight: 8 }} />
                                Nhận và hủy phòng
                            </>
                        }
                        name="options"
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            placeholder="Chọn chính sách"
                            options={optionsPolicies.map((item) => ({
                                label: item,
                                value: item,
                            }))}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label={
                            <>
                                <CarOutlined style={{ marginRight: 8 }} />
                                Có chỗ đậu xe riêng
                            </>
                        }
                        name="entranceParking"
                        valuePropName="checked"
                    >
                        <Switch checkedChildren="Có" unCheckedChildren="Không" />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label={
                            <>
                                <RestOutlined style={{ marginRight: 8 }} />
                                Mô tả phòng ngủ
                            </>
                        }
                        name="bedroomDetails"
                    >
                        <TextArea rows={2} placeholder="VD: 1 giường đôi, 1 sofa bed..." />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label={
                            <>
                                <HomeOutlined style={{ marginRight: 8 }} />
                                Mô tả phòng tắm
                            </>
                        }
                        name="bathroomDetails"
                    >
                        <TextArea rows={2} placeholder="VD: Có vòi sen, máy nước nóng..." />
                    </Form.Item>
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <Form.Item
                        label={
                            <>
                                <ToolOutlined style={{ marginRight: 8 }} />
                                Thiết bị hỗ trợ
                            </>
                        }
                        name="supportEquipments"
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            placeholder="Chọn thiết bị hỗ trợ"
                            options={supportEquipmentOptions.map((item) => ({
                                label: item,
                                value: item,
                            }))}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default Step1Part3Form;