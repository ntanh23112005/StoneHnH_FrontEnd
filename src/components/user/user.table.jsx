import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { message, notification, Popconfirm, Table } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';
import ViewUserDetail from './view.user.detail';
import { deleteUserAPI } from '../../services/api.service';

const UserTable = (props) => {

    const { dataUsers, loadUser,
        current, pageSize, total,
        setCurrent, setPageSize } = props;

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    const [dataDetail, setDataDetail] = useState(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)

    const handleDeleteUser = async (e) => {
        const res = await deleteUserAPI(e);
        if (res.data) {
            notification.success({
                message: "Delete User",
                description: "Delete User thành công"
            })
            await loadUser();
        } else {
            notification.success({
                message: "Error Delete User",
                description: JSON.stringify(res.message)
            })
        }
    };

    const columns = [
        {
            title: "Stt",
            render: (_, record, index) => {
                return (
                    <>{(index + 1) + (current - 1) * pageSize}</>
                )
            }
        },
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <a href="#" onClick={() => {
                        setDataDetail(record)
                        setIsDetailOpen(true)
                        // console.log(">> Check Record: ", record);
                    }}>{record._id}</a>
                )
            }
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined
                        onClick={() => {
                            console.log(">> Check Record: ", record);
                            setDataUpdate(record);
                            setIsModalUpdateOpen(true);
                        }}
                        style={{ cursor: "pointer", color: "orange" }} />
                    <Popconfirm
                        placement="left"
                        title={"Xác nhận xóa"}
                        description={"Bạn có chắc muốn xóa user này chứ ?"}
                        okText="Yes"
                        onConfirm={() => { handleDeleteUser(record._id) }}
                        cancelText="No"
                    >
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </Popconfirm>

                </div>
            ),
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        // Nếu thay đổi trang: current
        if (pagination && pagination.current) {
            if (+pagination.current !== current) {
                setCurrent(+pagination.current); //"5" -> 5
            }
        }

        // Nếu thay đổi tổng số phần tử: pageSize
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== pageSize) {
                setPageSize(+pagination.pageSize);
            }
        }
        console.log(">> Check: ", { pagination, filters, sorter, extra });
    };


    console.log(">>Check current; ", current);
    console.log(">>Check pageSize; ", pageSize);

    return (
        <>
            <Table
                rowKey={"_id"}
                columns={columns}
                dataSource={dataUsers}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }}
                onChange={onChange}
            />
            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />
            <ViewUserDetail
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                loadUser={loadUser}
            />

        </>
    )
}

export default UserTable;