import { SearchOutlined } from "@ant-design/icons";
import { Descriptions, Input, List, Modal, Spin, message } from "antd";
import { useEffect, useState } from "react";
import BookingListItem from "../../components/admin/booking/booking.card";
import { getAllBookings, getBookingById } from "../../services/admin/admin.api";

const BookingAdminPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    const [searchLoading, setSearchLoading] = useState(false);
    const [searchDetail, setSearchDetail] = useState(null);
    const [searchModalVisible, setSearchModalVisible] = useState(false);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                const res = await getAllBookings();
                console.log("API response:", res);

                if (Array.isArray(res.data?.data)) {
                    setBookings(res.data.data);
                } else if (Array.isArray(res.data)) {
                    setBookings(res.data);
                } else {
                    message.error("Dữ liệu trả về không hợp lệ.");
                    setBookings([]);
                }
            } catch (error) {
                console.error("API error:", error);
                message.error("Lỗi khi tải danh sách đơn đặt phòng.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleSearchBooking = async (bookingId) => {
        if (!bookingId) {
            message.warning("Vui lòng nhập mã đơn.");
            return;
        }
        try {
            setSearchLoading(true);
            const res = await getBookingById(bookingId.trim());
            const detail = res.data?.data;
            let detailData;
            if (!detail && res.data?.bookingId) {
                detailData = res.data;
            } else if (detail) {
                detailData = detail;
            } else {
                message.error("Không tìm thấy đơn đặt phòng.");
                return;
            }

            // Lấy thêm tên khách hàng và ngày đặt nếu đã có trong danh sách
            const bookingInList = bookings.find(
                (b) => b.bookingId === bookingId.trim()
            );
            if (bookingInList) {
                detailData = {
                    ...detailData,
                    customerName: bookingInList.customerName,
                    bookingDate: bookingInList.bookingDate,
                };
            }

            setSearchDetail(detailData);
            setSearchModalVisible(true);
        } catch (error) {
            console.error("API error:", error);
            message.error("Lỗi khi tìm kiếm đơn đặt phòng.");
        } finally {
            setSearchLoading(false);
        }
    };

    return (
        <>
            <Input.Search
                placeholder="Nhập mã đơn để tìm kiếm"
                enterButton={
                    <>
                        <SearchOutlined /> Tìm kiếm
                    </>
                }
                loading={searchLoading}
                onSearch={handleSearchBooking}
                style={{ maxWidth: 300, marginBottom: 16 }}
            />

            {loading ? (
                <Spin />
            ) : bookings.length > 0 ? (
                <List
                    itemLayout="horizontal"
                    dataSource={bookings}
                    renderItem={(booking) => (
                        <BookingListItem booking={booking} />
                    )}
                    pagination={{
                        pageSize: 5,
                        showSizeChanger: false,
                        showQuickJumper: true,
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} trong ${total} đơn đặt phòng`,
                    }}
                />
            ) : (
                <p>Không có đơn đặt phòng.</p>
            )}

            <Modal
                title="Chi tiết đơn đặt phòng"
                open={searchModalVisible}
                footer={null}
                onCancel={() => setSearchModalVisible(false)}
                width={600}
            >
                {searchLoading ? (
                    <Spin />
                ) : searchDetail ? (
                    <Descriptions
                        bordered
                        column={1}
                        labelStyle={{ fontWeight: "bold", width: 200 }}
                    >
                        <Descriptions.Item label="Mã đơn">
                            {searchDetail.bookingId}
                        </Descriptions.Item>
                        <Descriptions.Item label="Khách hàng">
                            {searchDetail.customerName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày đặt">
                            {searchDetail.bookingDate
                                ? new Date(searchDetail.bookingDate).toLocaleString()
                                : "Không rõ"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tổng tiền">
                            {searchDetail.totalPrice !== undefined
                                ? searchDetail.totalPrice.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                })
                                : "Không rõ"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng thái">
                            {searchDetail.paymentStatus === 1
                                ? "Đã thanh toán"
                                : searchDetail.paymentStatus === 0
                                    ? "Chờ thanh toán"
                                    : "Không rõ"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Ghi chú">
                            {searchDetail.note || "Không có"}
                        </Descriptions.Item>
                    </Descriptions>
                ) : (
                    <p>Không có dữ liệu chi tiết.</p>
                )}
            </Modal>
        </>
    );
};

export default BookingAdminPage;