import {
    Button, Input, Modal, Select, Space, Table, Tag, Typography,
} from "antd";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/context/auth.context";
import {
    acceptBooking,
    getAllBookingDetails,
    getAllBookings
} from "../../services/owner/owner.api";

const { Text } = Typography;
const { Option } = Select;

const OwnerBookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [bookingDetails, setBookingDetails] = useState([]);
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [detailLoading, setDetailLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [paymentStatusFilter, setPaymentStatusFilter] = useState(null);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const bookingsData = await getAllBookings(user.customerId);
                const detailsData = await getAllBookingDetails(user.customerId);

                const merged = bookingsData.map((booking) => {
                    const relatedDetails = detailsData.filter(
                        (d) => d.bookingId === booking.bookingId
                    );
                    const firstBookingTime = relatedDetails[0]?.bookingTime || null;

                    return {
                        ...booking,
                        bookingTime: firstBookingTime,
                    };
                }).sort((a, b) => new Date(b.bookingTime) - new Date(a.bookingTime));

                setBookings(merged);
            } catch (err) {
                console.error("Lỗi khi load bookings:", err);
            } finally {
                setLoading(false);
            }
        };

        if (user?.customerId) {
            fetchBookings();
        }
    }, [user]);

    const formatDate = (time) => {
        if (!time) return "Không xác định";
        const parsed = new Date(time);
        return isNaN(parsed.getTime())
            ? "Không xác định"
            : parsed.toLocaleString("vi-VN");
    };

    const getStatusTag = (status) => {
        switch (status) {
            case 0:
                return <Tag color="gold">Chưa thanh toán</Tag>;
            case 1:
                return <Tag color="green">Đã thanh toán</Tag>;
            case 2:
                return <Tag color="red">Đã hủy</Tag>;
            default:
                return <Tag>Không rõ</Tag>;
        }
    };

    const showBookingDetails = async (bookingId) => {
        setDetailLoading(true);
        setModalVisible(true);
        setSelectedBookingId(bookingId);
        try {
            const allDetails = await getAllBookingDetails(user.customerId);
            const filtered = allDetails.filter((d) => d.bookingId === bookingId);
            setBookingDetails(filtered);
        } catch (err) {
            console.error("Lỗi khi load chi tiết booking:", err);
        } finally {
            setDetailLoading(false);
        }
    };

    const filteredData = bookings.filter((booking) => {
        const matchSearch =
            booking.bookingId?.toLowerCase().includes(searchText.toLowerCase()) ||
            booking.customerName?.toLowerCase().includes(searchText.toLowerCase());

        const matchStatus =
            paymentStatusFilter === undefined ||
            paymentStatusFilter === null ||
            booking.paymentStatus === paymentStatusFilter;

        return matchSearch && matchStatus;
    });

    const handleAcceptBooking = async (bookingId) => {
        console.log("Booking ID gửi đi:", bookingId);
        try {
            const res = await acceptBooking(bookingId); // res = 1 nếu thành công
            console.log("Kết quả trả về từ API:", res);

            if (res === 1) {
                Modal.success({
                    title: "Đã chấp nhận đơn hàng.",
                    content: "Đơn hàng đã được chấp nhận.",
                });

                try {
                    const bookingsData = await getAllBookings(user.customerId);
                    const detailsData = await getAllBookingDetails(user.customerId);

                    const merged = bookingsData.map((booking) => {
                        const relatedDetails = detailsData.filter(
                            (d) => d.bookingId === booking.bookingId
                        );
                        const firstBookingTime = relatedDetails[0]?.bookingTime || null;

                        return {
                            ...booking,
                            bookingTime: firstBookingTime,
                        };
                    }).sort((a, b) => new Date(b.bookingTime) - new Date(a.bookingTime));

                    setBookings(merged);
                } catch (reloadError) {
                    console.error("Lỗi khi reload danh sách:", reloadError);
                    Modal.warning({
                        title: "Cảnh báo",
                        content: "Đơn đã chấp nhận nhưng không thể làm mới danh sách.",
                    });
                }

            } else {
                Modal.error({
                    title: "Lỗi",
                    content: "Không thể cập nhật đơn.",
                });
            }
        } catch (err) {
            console.error("Lỗi khi gửi yêu cầu:", err);
            Modal.error({
                title: "Lỗi",
                content: "Đã xảy ra lỗi khi kết nối đến máy chủ.",
            });
        }
    };

    const columns = [
        {
            title: "Ngày đặt",
            dataIndex: "bookingTime",
            key: "bookingTime",
            render: (time) => formatDate(time),
            sorter: (a, b) =>
                new Date(a.bookingTime) - new Date(b.bookingTime),
        },
        {
            title: "Tên khách hàng",
            dataIndex: "customerName",
            key: "customerName",
            sorter: (a, b) =>
                (a.customerName || "").localeCompare(b.customerName || ""),
        },
        {
            title: "Tổng tiền",
            dataIndex: "totalPrice",
            key: "totalPrice",
            render: (price) =>
                new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                    maximumFractionDigits: 0,
                }).format(price),
            sorter: (a, b) => a.totalPrice - b.totalPrice,
        },
        {
            title: "Trạng thái thanh toán",
            dataIndex: "paymentStatus",
            key: "paymentStatus",
            render: (status) => getStatusTag(status),
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <Space>
                    <Button type="link" onClick={() => showBookingDetails(record.bookingId)}>
                        Xem
                    </Button>
                    {record.paymentStatus === 0 && (
                        <Button
                            type="primary"
                            onClick={() =>
                                Modal.confirm({
                                    title: "Xác nhận chấp nhận đơn hàng?",
                                    content: "Bạn có chắc muốn chấp nhận đơn này?",
                                    okText: "Chấp nhận",
                                    cancelText: "Không",
                                    onOk: () => handleAcceptBooking(record.bookingId),
                                })
                            }
                        >
                            Chấp nhận
                        </Button>
                    )}
                </Space>
            ),
        },
    ];

    const detailColumns = [
        {
            title: "Homestay",
            dataIndex: "homestayName",
            key: "homestayName",
        },
        {
            title: "Ngày đặt",
            dataIndex: "bookingTime",
            key: "bookingTime",
            render: (time) => formatDate(time),
        },
        {
            title: "Check In",
            dataIndex: "checkInTime",
            key: "checkInTime",
            render: (time) => formatDate(time),
        },
        {
            title: "Check Out",
            dataIndex: "checkOutTime",
            key: "checkOutTime",
            render: (time) => formatDate(time),
        },
        {
            title: "Số khách",
            dataIndex: "numberOfCustomers",
            key: "numberOfCustomers",
        },
        {
            title: "Số thú cưng",
            dataIndex: "numberOfPets",
            key: "numberOfPets",
        },
    ];

    return (
        <>
            <Space style={{ marginBottom: 16 }}>
                <Input
                    placeholder="Tìm theo mã đơn hoặc tên người đặt..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    allowClear
                    style={{ width: 300 }}
                />
                <Select
                    value={paymentStatusFilter}
                    onChange={setPaymentStatusFilter}
                    allowClear
                    placeholder="Lọc theo trạng thái"
                    style={{ width: 200 }}
                >
                    <Option value={0}>Chưa thanh toán</Option>
                    <Option value={1}>Đã thanh toán</Option>
                    <Option value={2}>Đã hủy</Option>
                </Select>
            </Space>

            <Table
                columns={columns}
                dataSource={filteredData}
                rowKey="bookingId"
                loading={loading}
                pagination={{ pageSize: 5 }}
            />

            <Modal
                title={`Chi tiết đơn hàng: ${selectedBookingId}`}
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
                width={1200}
            >
                <Table
                    columns={detailColumns}
                    dataSource={bookingDetails}
                    rowKey={(r) => `${r.bookingId}-${r.homestayName}`}
                    loading={detailLoading}
                    pagination={false}
                />
            </Modal>
        </>
    );
};

export default OwnerBookingList;