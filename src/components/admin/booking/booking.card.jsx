import { EyeOutlined } from "@ant-design/icons";
import { Button, Descriptions, List, message, Modal, Spin, Tag } from "antd";
import { useState } from "react";
import { getBookingById } from "../../../services/admin/admin.api";

const BookingListItem = ({ booking }) => {
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [detailVisible, setDetailVisible] = useState(false);
    const [bookingDetail, setBookingDetail] = useState(null);

    const handleViewDetail = async () => {
        try {
            setLoadingDetail(true);
            const res = await getBookingById(booking.bookingId);
            const detail = res.data?.data;
            if (!detail && res.data?.bookingId) {
                setBookingDetail(res.data);
            } else if (detail) {
                setBookingDetail(detail);
            } else {
                message.error("Không tìm thấy dữ liệu chi tiết.");
                return;
            }
            setDetailVisible(true);
        } catch (error) {
            console.error("API error:", error);
            message.error("Lỗi khi tải chi tiết đơn đặt phòng.");
        } finally {
            setLoadingDetail(false);
        }
    };

    return (
        <>
            <List.Item
                actions={[
                    <Button
                        key="view-detail"
                        type="primary"
                        icon={<EyeOutlined />}
                        onClick={handleViewDetail}
                        size="small"
                    >
                        Xem chi tiết
                    </Button>,
                ]}
            >
                <List.Item.Meta
                    title={`Mã đơn: ${booking.bookingId}`}
                    description={
                        <>
                            <div><strong>Khách hàng:</strong> {booking.customerName || "Không rõ"}</div>
                            <div>
                                <strong>Ngày đặt:</strong>{" "}
                                {booking.bookingDate
                                    ? new Date(booking.bookingDate).toLocaleDateString()
                                    : "Không rõ"}
                            </div>
                        </>
                    }
                />
                <div style={{ textAlign: "right" }}>
                    <div>
                        <strong>Tổng tiền:</strong>{" "}
                        {booking.totalPrice !== undefined
                            ? booking.totalPrice.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            })
                            : "Không rõ"}
                    </div>
                    <div>
                        <Tag color={booking.paymentStatus === 1 ? "green" : "orange"}>
                            {booking.paymentStatus === 1
                                ? "Đã thanh toán"
                                : booking.paymentStatus === 0
                                    ? "Chờ thanh toán"
                                    : "Không rõ"}
                        </Tag>
                    </div>
                </div>
            </List.Item>

            <Modal
                title="Chi tiết đơn đặt phòng"
                open={detailVisible}
                footer={null}
                onCancel={() => setDetailVisible(false)}
                width={600}
            >
                {loadingDetail ? (
                    <Spin />
                ) : bookingDetail ? (
                    <Descriptions
                        bordered
                        column={1}
                        labelStyle={{ fontWeight: "bold", width: 200 }}
                    >
                        <Descriptions.Item label="Mã đơn">
                            {bookingDetail.bookingId}
                        </Descriptions.Item>
                        <Descriptions.Item label="Khách hàng">
                            {booking.customerName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày đặt">
                            {booking.bookingDate
                                ? new Date(booking.bookingDate).toLocaleString()
                                : "Không rõ"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tổng tiền">
                            {bookingDetail.totalPrice !== undefined
                                ? bookingDetail.totalPrice.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                })
                                : "Không rõ"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng thái">
                            {bookingDetail.paymentStatus === 1
                                ? "Đã thanh toán"
                                : bookingDetail.paymentStatus === 0
                                    ? "Chờ thanh toán"
                                    : "Không rõ"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ghi chú">
                            {bookingDetail.note || "Không có"}
                        </Descriptions.Item>
                    </Descriptions>
                ) : (
                    <p>Không có dữ liệu chi tiết.</p>
                )}
            </Modal>
        </>
    );
};

export default BookingListItem;