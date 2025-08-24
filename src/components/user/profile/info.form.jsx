import {
  Form,
  Input,
  Button,
  Tag,
  Row,
  Col,
  Modal,
  InputNumber,
  message,
} from "antd";
import {
  CheckCircleOutlined,
  CheckOutlined,
  CloseCircleOutlined,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useEffect, useState, useContext } from "react";
import BankSelect from "../../payment/bank.select";
import {
  createNewCustomerBank,
  updateCustomerBankByCustomerId,
} from "../../../services/payment/payment-firebase";
import { AuthContext } from "../../context/auth.context";

const InfoForm = ({
  user,
  initialValues,
  isEditMode,
  setIsEditMode,
  onSubmit,
  customerBank,
}) => {
  const [form] = Form.useForm();
  const [formUpdateBank] = Form.useForm();
  const [isModalBankOpen, setIsModalBankOpen] = useState(false);
  const { fetchCustomerBank } = useContext(AuthContext);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues]);

  const submitBankForm = async () => {
    try {
      const values = await formUpdateBank.validateFields();
      console.log("Bank form values:", values);

      const bankData = {
        accountNo: values.customerBankAccountNo
          ? values.customerBankAccountNo.toString()
          : "",
        bin: values.bin ? values.bin.toString() : "",
        customerId: user?.customerId || "",
        customerBankName: values.customerBankName || "",
      };

      // console.log("Processed bank data:", bankData);
      if (customerBank === null || customerBank === undefined) {
        const resp = await createNewCustomerBank(bankData);

        if (resp) {
          message.success("Cập nhật ngân hàng thành công");
          setIsModalBankOpen(false);
          formUpdateBank.resetFields();

          // Refresh lại dữ liệu ngân hàng
          if (user?.customerId) {
            await fetchCustomerBank(user.customerId);
          }
        } else {
          message.error("Cập nhật ngân hàng thất bại");
        }
      } else {
        const respUpdate = await updateCustomerBankByCustomerId(
          user.customerId,
          bankData
        );
        if (respUpdate) {
          message.success("Cập nhật ngân hàng thành công");
          setIsModalBankOpen(false);
          formUpdateBank.resetFields();

          // Refresh lại dữ liệu ngân hàng
          if (user?.customerId) {
            await fetchCustomerBank(user.customerId);
          }
        } else {
          message.error("Cập nhật ngân hàng thất bại");
        }
      }
    } catch (error) {
      console.log("Validation failed", error);
      message.error("Vui lòng kiểm tra lại thông tin");
    }
  };

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
            {/* Sửa điều kiện hiển thị thông tin ngân hàng */}
            {user.customerBank || customerBank ? (
              <span>
                <label style={{ marginRight: 10 }}>
                  <CheckCircleOutlined
                    style={{ color: "green", fontSize: 20 }}
                    className="mr-2"
                  />
                  {customerBank.customerBankName
                    ? customerBank.customerBankName
                    : "KHÔNG XÁC ĐỊNH"}
                </label>
                <Button
                  onClick={() => setIsModalBankOpen(true)}
                  style={{ marginTop: 16 }}
                >
                  Thay đổi
                </Button>
              </span>
            ) : (
              <Button
                onClick={() => setIsModalBankOpen(true)}
                style={{ marginTop: 16 }}
                type="primary"
              >
                Cập nhật thông tin ngân hàng
              </Button>
            )}
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
        open={isModalBankOpen}
        onOk={submitBankForm}
        onCancel={() => {
          setIsModalBankOpen(false);
          formUpdateBank.resetFields();
        }}
        okText="Cập nhật"
        cancelText="Hủy"
      >
        <Form form={formUpdateBank} layout="vertical">
          <Row className="my-2">
            <Col span={24}>
              <Form.Item
                label="Chọn ngân hàng"
                name="bin"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn ngân hàng!",
                  },
                ]}
              >
                <BankSelect isModalBankOpen={isModalBankOpen} />
              </Form.Item>
            </Col>
          </Row>

          <Row className="my-2" gutter={24}>
            <Col span={24}>
              <Form.Item
                label="Số tài khoản ngân hàng"
                name="customerBankAccountNo"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số tài khoản ngân hàng!",
                  },
                ]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row className="my-2" gutter={24}>
            <Col span={24}>
              <Form.Item
                label="Tên chủ tài khoản (NGUYEN VAN A)"
                name="customerBankName"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên chủ tài khoản!",
                  },
                  {
                    pattern: /^[A-Z\s]+$/,
                    message: "Tên phải viết hoa không dấu (VD: NGUYEN VAN A)",
                  },
                ]}
              >
                <Input
                  placeholder="NGUYEN VAN A"
                  style={{ textTransform: "uppercase" }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default InfoForm;
