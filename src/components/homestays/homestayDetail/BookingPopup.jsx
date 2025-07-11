import { useState } from "react";
import { DateRange } from "react-date-range";
import { vi } from "date-fns/locale";
import { differenceInCalendarDays } from "date-fns";
import { Modal, Button, TimePicker, message } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { formatDateTime } from "../../../utils/FormatDateTime";
import { defaultBooking, defaultBookingDetail } from "../../../types/booking.type";
import { createBookingWithDetail } from "../../../services/booking/api.booking";
import { useBookingDates, useBookingGuests, useBookingTime } from "../../../hooks/useBookingHook";


const BookingPopup = (props) => {
    const { open, onClose, dailyPrice, maxCustomer, homestay, customerId } = props;

    const [range, setRange] = useState([
        { startDate: new Date(), endDate: new Date(), key: "selection" },
    ]);

    const disabledDates = useBookingDates(open, homestay.homestayId);
    const { guests, increment, decrement, resetGuests } = useBookingGuests(maxCustomer);
    const { checkInTime, setCheckInTime, checkOutTime, setCheckOutTime, resetTime } = useBookingTime();

    const resetState = () => {
        setRange([{ startDate: new Date(), endDate: new Date(), key: "selection" }]);
        resetGuests();
        resetTime();
    };

    const selectedRange = range[0];
    const numDays = selectedRange.endDate && selectedRange.startDate
        ? differenceInCalendarDays(selectedRange.endDate, selectedRange.startDate)
        : 0;
    const totalPrice = (numDays === 0 ? 1 : numDays) * dailyPrice * guests;

    const handleConfirm = async () => {
        if (!selectedRange.startDate || !selectedRange.endDate) {
            message.warning("Bạn cần chọn ngày check-in và check-out");
            return;
        }

        const bookingTime = new Date();
        const bookingTimeStr = formatDateTime(bookingTime, dayjs(bookingTime));
        const checkInStr = formatDateTime(selectedRange.startDate, checkInTime);
        const checkOutStr = formatDateTime(selectedRange.endDate, checkOutTime);

        const creationBooking = {
            ...defaultBooking,
            customerId,
            totalPrice,
            paymentStatus: 0,
        };

        const creationBookingDetail = {
            ...defaultBookingDetail,
            homestayId: homestay.homestayId,
            bookingTime: bookingTimeStr,
            checkInTime: checkInStr,
            checkOutTime: checkOutStr,
            numberOfCustomers: guests,
            numberOfPets: 0,
        };

        const res = await createBookingWithDetail(creationBooking, creationBookingDetail);
        if (res.data) {
            message.success("Đặt phòng hoàn tất");
            onClose();
            resetState();
        }
    };

    return (
        <Modal
            title="ĐẶT PHÒNG NGAY"
            open={open}
            onCancel={onClose}
            footer={null}
            width={700}
        >
            <p style={{ color: "red" }}>* Ngày bị ẩn: Phòng đã được đặt / Ngày trước </p>
            <DateRange
                editableDateInputs
                onChange={(item) => setRange([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={range}
                months={2}
                direction="horizontal"
                showDateDisplay={false}
                rangeColors={["#4266b3"]}
                minDate={new Date()}
                locale={vi}
                disabledDates={disabledDates}
            />

            {/* Thông tin thời gian check-in / check-out */}
            <div
                style={{
                    marginTop: 16,
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 24,
                    flexWrap: "wrap"
                }}
            >
                <div>
                    <div style={{ fontWeight: "500", marginBottom: 4 }}>Giờ check-in</div>
                    <TimePicker
                        value={checkInTime}
                        onChange={setCheckInTime}
                        format="HH:mm"
                        disabled
                    />
                </div>
                <div>
                    <div style={{ fontWeight: "500", marginBottom: 4 }}>Giờ check-out</div>
                    <TimePicker
                        value={checkOutTime}
                        onChange={setCheckOutTime}
                        format="HH:mm"
                        disabled
                    />
                </div>
            </div>

            <div
                style={{
                    border: "1px solid #ddd",
                    borderRadius: "12px",
                    padding: "16px",
                    marginTop: "24px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                }}
            >
                {/* Thông tin ngày */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                    }}
                >
                    <div>
                        <div style={{ fontWeight: "500" }}>Ngày nhận phòng</div>
                        <div style={{ color: "#555" }}>
                            {selectedRange.startDate
                                ? selectedRange.startDate.toLocaleDateString("vi-VN")
                                : "Chưa chọn"}
                        </div>
                    </div>
                    <div>
                        <div style={{ fontWeight: "500" }}>Ngày trả phòng</div>
                        <div style={{ color: "#555" }}>
                            {selectedRange.endDate
                                ? selectedRange.endDate.toLocaleDateString("vi-VN")
                                : "Chưa chọn"}
                        </div>
                    </div>
                    <div>
                        <div style={{ fontWeight: "500" }}>Số đêm</div>
                        <div style={{ color: "#555" }}>
                            {numDays === 0 ? 1 : numDays} đêm
                        </div>
                    </div>
                </div>

                <div style={{ height: "1px", background: "#eee", width: "100%" }} />

                {/* Số lượng khách */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <div style={{ fontWeight: "500" }}>Số lượng khách</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <Button
                            shape="circle"
                            onClick={decrement}
                            disabled={guests <= 1}
                            style={{
                                border: "1px solid #ccc",
                                backgroundColor: "#4266b3",
                                color: "white",
                            }}
                        >
                            –
                        </Button>
                        <div
                            style={{
                                minWidth: "32px",
                                textAlign: "center",
                                fontSize: "16px",
                            }}
                        >
                            {guests}
                        </div>
                        <Button
                            shape="circle"
                            onClick={increment}
                            disabled={guests >= maxCustomer}
                            style={{
                                border: "1px solid #ccc",
                                backgroundColor: "#4266b3",
                                color: "white",
                            }}
                        >
                            +
                        </Button>
                    </div>
                </div>

                {/* Tổng tiền */}
                <div
                    style={{
                        marginTop: "8px",
                        textAlign: "right",
                        fontWeight: "bold",
                        fontSize: "16px",
                    }}
                >
                    Tổng tiền: {totalPrice.toLocaleString()} VND
                </div>
            </div>

            <div style={{ textAlign: "right", marginTop: 24 }}>
                <Button onClick={onClose} style={{ marginRight: 8 }}>
                    Huỷ
                </Button>
                <Button type="primary" onClick={handleConfirm}>
                    Xác nhận
                </Button>
            </div>
        </Modal>
    );
};

export default BookingPopup;
