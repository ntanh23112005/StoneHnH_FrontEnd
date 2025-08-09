import { Button, Form, message, Modal, Select, Spin, Table, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { createPayment, deleteBookingById, getPaymentsByCustomerId } from "../../services/payment/payment.api";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Option } = Select;

const PaymentForm = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterStatus, setFilterStatus] = useState("all");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("Tiền mặt");
    const { user } = useContext(AuthContext);

    const fetchPayments = async () => {
        if (!user?.customerId) return;
        setLoading(true);
        try {
            const response = await getPaymentsByCustomerId(user.customerId);
            const resData = response.data;
            if (Array.isArray(resData)) {
                setPayments(resData);
            } else {
                message.error("Không thể tải danh sách thanh toán");
            }
        } catch (error) {
            message.error("Đã xảy ra lỗi khi tải thanh toán");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.customerId) {
            fetchPayments();
        }
    }, [user?.customerId]);

    const handleCancelBooking = (bookingId) => {
        console.log(bookingId)
        Modal.confirm({
            title: "Xác nhận hủy đơn đặt phòng",
            content: "Bạn có chắc chắn muốn hủy đơn đặt phòng này?",
            okText: "Xác nhận",
            cancelText: "Hủy",
            onOk: async () => {
                try {
                    const res = await deleteBookingById(bookingId);
                    if (res.success) {
                        message.success("Đã hủy đơn đặt phòng.");
                        fetchPayments();
                    } else {
                        message.error(res.message || "Hủy thất bại.");
                    }
                } catch (error) {
                    console.error(error);
                    message.error("Lỗi hệ thống. Vui lòng thử lại.");
                }
            }
        });
    };

    const handleOpenPaymentModal = (record) => {
        setSelectedBooking(record);
        setIsModalOpen(true);
    };

    const handlePayment = async () => {
        if (!selectedBooking) return;

        const payload = {
            bookingId: selectedBooking.bookingId,
            paymentName: paymentMethod,
            status: 1,
        };

        try {
            const res = await createPayment(payload);
            if (res?.success) {
                message.success("Thanh toán thành công");
                setIsModalOpen(false);
                fetchPayments();
            } else {
                message.error(res?.message || "Thanh toán thất bại");
            }
        } catch (error) {
            console.error(error);
            message.error("Lỗi hệ thống khi thanh toán.");
        }
    };

    const filteredData = payments.filter((item) => {
        if (filterStatus === "all") return true;
        return String(item.status) === filterStatus;
    });

    const columns = [
        {
            title: "Mã booking",
            dataIndex: "bookingId",
            key: "bookingId",
        },
        {
            title: "Tên homestay",
            dataIndex: "homestayName",
            key: "homestayName",
        },
        {
            title: "Ngày đặt",
            dataIndex: "bookingTime",
            key: "bookingTime",
            render: (text) => new Date(text).toLocaleString("vi-VN"),
        },
        {
            title: "Check-in",
            dataIndex: "checkInTime",
            key: "checkInTime",
            render: (text) => new Date(text).toLocaleDateString("vi-VN"),
        },
        {
            title: "Check-out",
            dataIndex: "checkOutTime",
            key: "checkOutTime",
            render: (text) => new Date(text).toLocaleDateString("vi-VN"),
        },
        {
            title: "Tổng người",
            render: (_, record) =>
                `${record.numberOfCustomers} khách + ${record.numberOfPets} thú cưng`,
        },
        {
            title: "Tổng tiền",
            dataIndex: "totalPrice",
            key: "totalPrice",
            render: (price) =>
                price?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            render: (status) => {
                switch (status) {
                    case 0:
                        return "Chưa thanh toán";
                    case 1:
                        return "Đã thanh toán";
                    case 3:
                        return "Đang chờ duyệt";
                    default:
                        return "Không xác định";
                }
            },
        },
        {
            title: "Hành động",
            render: (_, record) => {
                if (record.status === 1) {
                    return <span style={{ color: "green" }}>Thanh toán thành công</span>;
                }

                if (record.status === 3) {
                    return <span style={{ color: "orange" }}>Đang chờ duyệt</span>;
                }

                return (
                    <>
                        <Button
                            type="primary"
                            size="small"
                            style={{ marginRight: 8 }}
                            onClick={() => handleOpenPaymentModal(record)}
                        >
                            Thanh toán
                        </Button>
                        <Button
                            danger
                            size="small"
                            onClick={() => handleCancelBooking(record.bookingId)}
                        >
                            Hủy
                        </Button>
                    </>
                );
            },
        },
    ];

    return (
        <div style={{ padding: 24 }}>
            <Title level={3}>Lịch sử đặt phòng</Title>

            <div style={{ marginBottom: 16 }}>
                <Select value={filterStatus} onChange={setFilterStatus} style={{ width: 200 }}>
                    <Option value="all">Tất cả</Option>
                    <Option value="0">Chưa thanh toán</Option>
                    <Option value="1">Đã thanh toán</Option>
                    <Option value="3">Đang chờ duyệt</Option>
                </Select>
            </div>

            <Spin spinning={loading}>
                <Table
                    rowKey="bookingId"
                    dataSource={filteredData}
                    columns={columns}
                    pagination={{ pageSize: 8 }}
                />
            </Spin>

            <Modal
                open={isModalOpen}
                title="Xác nhận thanh toán"
                onCancel={() => setIsModalOpen(false)}
                onOk={handlePayment}
                okText="Thanh toán"
                cancelText="Hủy"
            >
                {selectedBooking && (
                    <>
                        <p><strong>Tên homestay:</strong> {selectedBooking.homestayName}</p>
                        <p>
                            <strong>Tổng tiền:</strong>{" "}
                            {selectedBooking.totalPrice.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            })}
                        </p>
                        <Form layout="vertical">
                            <Form.Item label="Phương thức thanh toán">
                                <Select
                                    value={paymentMethod}
                                    onChange={(val) => setPaymentMethod(val)}
                                >
                                    <Option value="Tiền mặt">Tiền mặt</Option>
                                    <Option value="Chuyển khoản">Chuyển khoản</Option>
                                    <Option value="Ví điện tử">Ví điện tử</Option>
                                </Select>
                            </Form.Item>
                        </Form>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default PaymentForm;
