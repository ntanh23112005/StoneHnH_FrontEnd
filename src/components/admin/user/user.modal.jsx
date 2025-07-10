import { Modal, Form, Input, Switch, Select, message } from 'antd';
import { useEffect } from 'react';
import { createNewUser, updateUser } from '../../../services/admin/admin.api';
import { roleNameToIdMap } from '../../../constants/roles';

const { Option } = Select;

const UserModal = ({ open, onCancel, customer }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (customer) {
            form.setFieldsValue({
                ...customer,
                roleName: customer.roleName?.map(role => roleNameToIdMap[role] || role),
                accountStatus: customer.accountStatus,
                verifyStatus: customer.verifyStatus
            });
        } else {
            form.resetFields();
        }
    }, [customer, form]);

    const onFinish = async (values) => {
        const payload = {
            creationCustomer: {
                customerName: values.customerName,
                email: values.email,
                password: values.password, // Chỉ nên gửi khi tạo mới
                phoneNumber: values.phoneNumber,
                customerAddress: values.customerAddress,
                accountStatus: values.accountStatus,
                verifyStatus: values.verifyStatus
            },
            roleIds: values.roleName
        };

        console.log("Form values:", values);
        console.log("Payload gửi BE:", payload);

        try {
            if (customer?.customerId) {
                // Cập nhật
                await updateUser(payload);
                message.success("Cập nhật người dùng thành công!");
            } else {
                // Tạo mới
                await createNewUser(payload);
                message.success("Tạo người dùng thành công!");
            }
            onCancel(); // đóng modal và trigger reload ở cha
        } catch (error) {
            console.error("Submit failed", error);
            message.error("Đã xảy ra lỗi khi lưu người dùng.");
        }
    };

    return (
        <Modal
            title={customer ? 'Cập nhật người dùng' : 'Thêm người dùng'}
            open={open}
            onCancel={onCancel}
            onOk={() => form.submit()}
            okText={customer ? 'Cập nhật' : 'Tạo mới'}
        >
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item name="customerName" label="Tên người dùng" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="phoneNumber" label="Số điện thoại">
                    <Input />
                </Form.Item>
                <Form.Item name="password" label="Mật khẩu" rules={[{ required: true }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item name="customerAddress" label="Địa chỉ">
                    <Input />
                </Form.Item>
                <Form.Item name="roleName" label="Vai trò">
                    <Select mode="multiple">
                        <Option value="R01">USER</Option>
                        <Option value="R03">ADMIN</Option>
                        <Option value="R02">OWNER</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="accountStatus" label="Hoạt động" valuePropName="checked">
                    <Switch />
                </Form.Item>
                <Form.Item name="verifyStatus" label="Đã xác thực" valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UserModal;
