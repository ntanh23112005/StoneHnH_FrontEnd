import {
  Button,
  Form,
  message,
  Modal,
  Select,
  Spin,
  Table,
  Typography,
  Tag,
} from "antd";
import { useContext, useEffect, useState } from "react";
import {
  createPayment,
  deleteBookingById,
  getPaymentsByCustomerId,
} from "../../services/payment/payment.api";
import { AuthContext } from "../context/auth.context";
import { getOwnerIdByBookingId } from "../../services/booking/api.booking";
import axios from "axios";
import { findCustomerBankByCustomerId } from "../../services/payment/payment-firebase";

const { Title } = Typography;
const { Option } = Select;

const PaymentForm = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Tiền mặt");
  const [qrCode, setQrCode] = useState(null);
  const [generatingQr, setGeneratingQr] = useState(false);
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
      },
    });
  };

  const handleOpenPaymentModal = async (record) => {
    setSelectedBooking(record);
    setIsModalOpen(true);
    setQrCode(null); // Reset QR code khi mở modal mới
  };

  const generateQrCode = async (booking) => {
    setGeneratingQr(true);
    try {
      // Lấy ownerId từ bookingId
      const ownerResponse = await getOwnerIdByBookingId(booking.bookingId);
      if (!ownerResponse.success) {
        throw new Error("Không thể lấy thông tin chủ homestay");
      }

      const ownerId = ownerResponse.data.customerId;
      console.log("Owner ID:", ownerId);

      // Lấy thông tin tài khoản ngân hàng của chủ homestay
      const bankResponse = await findCustomerBankByCustomerId(ownerId);
      if (bankResponse.length === 0) {
        throw new Error("Không thể lấy thông tin ngân hàng");
      }

      const { accountNo, customerBankName, bin } = bankResponse[0];
      console.log("BankResponse FireBase: ", bankResponse);

      // Gọi API VietQR để tạo mã QR
      const qrResponse = await axios.post("https://api.vietqr.io/v2/generate", {
        accountNo: accountNo,
        accountName: customerBankName, // Có thể thay bằng tên thực từ API
        acqId: bin,
        amount: booking.totalPrice,
        addInfo: `Thanh toán cho booking ${booking.bookingId}`,
        template: "print",
      });

      if (
        qrResponse.data &&
        qrResponse.data.data &&
        qrResponse.data.data.qrDataURL
      ) {
        setQrCode(qrResponse.data.data.qrDataURL);
      } else {
        throw new Error("Không thể tạo mã QR");
      }
    } catch (error) {
      console.error("Lỗi khi tạo mã QR:", error);
      message.error("Không thể tạo mã QR. Vui lòng thử lại phương thức khác.");
    } finally {
      setGeneratingQr(false);
    }
  };

  const handlePaymentMethodChange = async (value) => {
    setPaymentMethod(value);

    // Nếu chọn chuyển khoản và có booking được chọn, tạo mã QR
    if (value === "Chuyển khoản" && selectedBooking) {
      await generateQrCode(selectedBooking);
    } else {
      setQrCode(null); // Xóa mã QR nếu chọn phương thức khác
    }
  };

  const handlePayment = async () => {
    if (!selectedBooking) return;

    const payload = {
      bookingId: selectedBooking.bookingId,
      paymentName: paymentMethod,
      status: 1,
    };

    // Nếu paymentMethod == "Chuyển khoản" thì hỏi xác nhận
    if (paymentMethod === "Chuyển khoản") {
      Modal.confirm({
        title: "Xác nhận thanh toán",
        content: "Bạn có chắc chắn đã trả tiền và muốn xác nhận thanh toán?",
        okText: "Đồng ý",
        cancelText: "Hủy",
        onOk: async () => {
          await proceedPayment(payload);
        },
      });
    } else {
      await proceedPayment(payload);
    }
  };

  const proceedPayment = async (payload) => {
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

  const getStatusTag = (status) => {
    let color, text;
    switch (status) {
      case 0:
        color = "orange";
        text = "Chưa thanh toán";
        break;
      case 1:
        color = "green";
        text = "Đã thanh toán";
        break;
      case 3:
        color = "blue";
        text = "Đang chờ duyệt";
        break;
      default:
        color = "default";
        text = "Không xác định";
    }
    return <Tag color={color}>{text}</Tag>;
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
      render: (status) => getStatusTag(status),
    },
    {
      title: "Hành động",
      render: (_, record) => {
        if (record.status === 1) {
          return <Tag color="green">Thanh toán thành công</Tag>;
        }

        if (record.status === 3) {
          return <Tag color="blue">Đang chờ duyệt</Tag>;
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
        <Select
          value={filterStatus}
          onChange={setFilterStatus}
          style={{ width: 200 }}
        >
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
        onCancel={() => {
          setIsModalOpen(false);
          setQrCode(null);
        }}
        onOk={handlePayment}
        okText="Thanh toán"
        cancelText="Hủy"
        width={500}
      >
        {selectedBooking && (
          <>
            <p>
              <strong>Tên homestay:</strong> {selectedBooking.homestayName}
            </p>
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
                  onChange={handlePaymentMethodChange}
                >
                  <Option value="Tiền mặt">Tiền mặt</Option>
                  <Option value="Chuyển khoản">Chuyển khoản</Option>
                </Select>
              </Form.Item>
            </Form>

            {/* Hiển thị mã QR nếu chọn chuyển khoản */}
            {paymentMethod === "Chuyển khoản" && (
              <div style={{ textAlign: "center", marginTop: 16 }}>
                <Spin spinning={generatingQr}>
                  {qrCode ? (
                    <>
                      <img
                        src={qrCode}
                        alt="Mã QR thanh toán"
                        style={{
                          width: 300,
                          height: 400,
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                        }}
                      />
                      <p style={{ marginTop: 8, color: "#666" }}>
                        Quét mã QR để thanh toán
                      </p>
                    </>
                  ) : (
                    !generatingQr && (
                      <p style={{ color: "#ff4d4f" }}>
                        Không thể tạo mã QR. Vui lòng thử lại hoặc chọn phương
                        thức khác.
                      </p>
                    )
                  )}
                </Spin>
              </div>
            )}
          </>
        )}
      </Modal>
    </div>
  );
};

export default PaymentForm;
