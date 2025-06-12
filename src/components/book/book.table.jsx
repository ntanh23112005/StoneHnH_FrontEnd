import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm, Table } from "antd";
import ViewBookDeTail from "./view.book.detail";
import { useEffect, useState } from "react";
import { fetchAllBookAPI } from "../../services/api.service";

const BookTable = (props) => {

    // const {
    //     current, pageSize,
    //     setCurrent, setPageSize } = props;

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [dataBooks, setDataBooks] = useState([])
    const [total, setTotal] = useState(0)

    const [dataDetail, setDataDetail] = useState(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)

    const [loadingTable, setLoadingTable] = useState(false)

    useEffect(() => {
        loadBooks();
    }, [current, pageSize])

    const loadBooks = async () => {
        setLoadingTable(true);
        const res = await fetchAllBookAPI(current, pageSize)
        if (res.data) {
            setDataBooks(res.data.result)
            setCurrent(res.data.meta.current)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
        setLoadingTable(false)
    }
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
                        console.log(">> Check Record: ", record);
                    }}>{record._id}</a>
                )
            }
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'mainText',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            render: (text) => {
                if (text) {
                    return new Intl.NumberFormat('vi-VN',
                        { style: 'currency', currency: 'VND' }
                    ).format(text)
                }
            }
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined
                        onClick={() => {
                            // console.log(">> Check Record: ", record);
                            // setDataUpdate(record);
                            // setIsModalUpdateOpen(true);
                        }}
                        style={{ cursor: "pointer", color: "orange" }} />
                    <Popconfirm
                        placement="left"
                        title={"Xác nhận xóa"}
                        description={"Bạn có chắc muốn xóa user này chứ ?"}
                        okText="Yes"
                        // onConfirm={() => { handleDeleteUser(record._id) }}
                        cancelText="No"
                    >
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </Popconfirm>

                </div>
            ),
        },
    ];

    // filters, sorter, extra lấy trên overflow chưa xài gì hết
    const onchange = (pagination, filters, sorter, extra) => {
        // nếu trang thay đổi
        if (pagination && pagination.current) {
            if (+pagination.current !== current) {
                setCurrent(+pagination.current) //"5" -> 5
            }
        }

        // Nếu thay đổi tổng số phần tử: pageSize
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== pageSize) {
                setPageSize(+pagination.pageSize);
            }
        }
        console.log(">> Check: ", { pagination, filters, sorter, extra });
    }

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataBooks}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }}
                onChange={onchange}
                loading={loadingTable}
            />
            <ViewBookDeTail
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                loadBooks={loadBooks} />
        </>
    )
}

export default BookTable