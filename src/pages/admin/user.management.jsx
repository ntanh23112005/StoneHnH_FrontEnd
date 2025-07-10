import { Button, Card, Input, Space } from 'antd';
import { useEffect, useState } from 'react';
import UserTable from '../../components/admin/user/user.table';
import UserModal from '../../components/admin/user/user.modal';
import { getAllUsers } from '../../services/admin/admin.api';

const UserAdminPage = () => {
    const [customers, setCustomers] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [searchInput, setSearchInput] = useState();

    const fetchCustomers = async () => {
        const res = await getAllUsers();
        if (res?.data) setCustomers(res.data);
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleOpenModal = (customer = null) => {
        setSelectedCustomer(customer);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedCustomer(null);
        fetchCustomers();
    };

    const handleSearch = async () => {
        const res = await getAllUsers(searchInput)
        if (res.data) setCustomers(res.data)
    }

    return (
        <Card
            title="Quản lý người dùng"
            extra={
                <Space>
                    <Input.Search
                        placeholder="Tìm theo email"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onSearch={handleSearch}
                        allowClear
                        style={{ width: 250 }}
                    />
                    <Button type="primary" onClick={() => handleOpenModal()}>Thêm người dùng</Button>
                </Space>
            }
        >
            <UserTable data={customers} onEdit={handleOpenModal} />
            <UserModal
                open={openModal}
                onCancel={handleCloseModal}
                customer={selectedCustomer}
            />
        </Card>
    );
};

export default UserAdminPage;
