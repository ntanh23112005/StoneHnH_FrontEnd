import { Form, Input, Button, Tag, Row, Col, Modal } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import BankSelect from "../../payment/bank.select";

const InfoForm = ({
  user,
  initialValues,
  isEditMode,
  setIsEditMode,
  onSubmit,
}) => {
  const [form, formUpdateBank] = Form.useForm();

  const [isModalBankOpen, setIsModalBankOpen] = useState(false);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues]);

  return (
    <>
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Name"
              name="customerName"
              rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
            >
              <Input disabled={!isEditMode} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Email" name="email">
              <Input prefix={<MailOutlined />} disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
                {
                  pattern: /^[0-9]{9,12}$/,
                  message: "Số điện thoại không hợp lệ (9-12 chữ số)",
                },
              ]}
            >
              <Input prefix={<PhoneOutlined />} disabled={!isEditMode} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Address"
          name="customerAddress"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
        >
          <Input prefix={<HomeOutlined />} disabled={!isEditMode} />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Created Date" name="createdDate">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Verified">
              {user.verifyStatus ? (
                <Tag icon={<CheckCircleOutlined />} color="success">
                  Đã xác thực
                </Tag>
              ) : (
                <Tag icon={<CloseCircleOutlined />} color="error">
                  Chưa xác thực
                </Tag>
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Account Status">
              {user.accountStatus ? (
                <Tag color="blue">Đã kích hoạt tài khoản</Tag>
              ) : (
                <Tag color="red">Chưa kích hoạt tài khoản</Tag>
              )}
            </Form.Item>
          </Col>
        </Row>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Button
              onClick={() => setIsModalBankOpen(true)}
              style={{ marginTop: 16 }}
            >
              Cập nhật thông tin ngân hàng
            </Button>
          </div>

          <div style={{ marginTop: 16 }}>
            {!isEditMode ? (
              <Button
                type="primary"
                onClick={() => setIsEditMode(true)}
                style={{
                  backgroundColor: "#4266b3",
                  borderColor: "#4266b3",
                }}
              >
                Chỉnh sửa thông tin
              </Button>
            ) : (
              <div
                style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}
              >
                <Button
                  onClick={() => {
                    form.resetFields();
                    setIsEditMode(false);
                  }}
                >
                  Hủy
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    form
                      .validateFields()
                      .then(onSubmit)
                      .catch((err) => console.log("Validation failed", err));
                  }}
                  style={{
                    backgroundColor: "#4266b3",
                    borderColor: "#4266b3",
                  }}
                >
                  Lưu
                </Button>
              </div>
            )}
          </div>
        </div>
      </Form>

      <Modal
        title="Cập nhật ngân hàng"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalBankOpen}
        onOk={() => {
          form
            .validateFields()
            .then(onSubmit)
            .catch((err) => console.log("Validation failed", err));

          setIsModalBankOpen(false);
        }}
        onCancel={() => setIsModalBankOpen(false)}
      >
        <Form form={formUpdateBank} layout="vertical">
          <Row className="my-3" gutter={24}>
            <Col span={24}>
              <Form.Item
                label="Chọn ngân hàng"
                name="customerBank"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng ngân hàng!",
                  },
                ]}
              >
                <BankSelect />
              </Form.Item>
            </Col>
          </Row>

          <Row className="my-3" gutter={24}>
            <Col span={24}>
              <Form.Item
                label="Tên chủ ngân hàng (NGUYEN VAN A)"
                name="customerBankName"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên chủ ngân hàng!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default InfoForm;
