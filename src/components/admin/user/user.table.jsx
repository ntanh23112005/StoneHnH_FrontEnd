import { Table, Tag, Button } from 'antd';

const UserTable = ({ data, onEdit }) => {
    const columns = [
        { title: 'Tên', dataIndex: 'customerName', key: 'customerName' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'SĐT', dataIndex: 'phoneNumber', key: 'phoneNumber' },
        { title: 'Địa chỉ', dataIndex: 'customerAddress', key: 'customerAddress' },
        {
            title: 'Vai trò',
            dataIndex: 'roleName',
            key: 'roleName',
            render: roles => roles.map(role => (
                <Tag key={role} color="blue">{role}</Tag>
            ))
        },
        {
            title: 'Trạng thái',
            key: 'accountStatus',
            render: (_, record) => (
                <Tag color={record.accountStatus ? 'green' : 'red'}>
                    {record.accountStatus ? 'Hoạt động' : 'Bị khóa'}
                </Tag>
            )
        },
        {
            title: 'Thao tác',
            key: 'actions',
            render: (_, record) => (
                <Button type="link" onClick={() => onEdit(record)}>
                    Cập nhật
                </Button>
            )
        }
    ];

    return (
        <Table
            scroll={{ y: 400 }} // Giới hạn chiều cao, hiện scrollbar nếu nhiều dòng
            columns={columns}
            dataSource={data}
            rowKey="customerId"
            pagination={{ pageSize: 10 }}
        />
    );
};

export default UserTable;
