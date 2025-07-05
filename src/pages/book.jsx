import { useEffect, useState } from "react"
import BookTable from "../components/book/book.table"
import { fetchAllBookAPI } from "../services/api.service"
import BookForm from "../components/book/book.form"
import { DateRange } from "react-date-range"
import { vi } from 'date-fns/locale';
import { differenceInCalendarDays } from "date-fns"
import { Button, Modal } from "antd"

const BookPage = () => {
    const [open, setOpen] = useState(false);
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [guests, setGuests] = useState(1);

    const increment = () => {
        setGuests((prev) => Math.min(prev + 1, 20));
    };

    const decrement = () => {
        setGuests((prev) => Math.max(prev - 1, 1));
    };

    const handleOk = () => {
        setOpen(false);
        console.log(numDays);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const selectedRange = range[0];
    const numDays =
        selectedRange.endDate && selectedRange.startDate
            ? differenceInCalendarDays(
                selectedRange.endDate,
                selectedRange.startDate
            )
            : 0;

    return (
        <div style={{ padding: '30px' }}>
            <Button type="primary" onClick={() => setOpen(true)}>
                Chọn ngày
            </Button>

            <Modal
                title="ĐẶT PHÒNG NGAY"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                width={700}
                footer={null}
            >

                <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setRange([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={range}
                    months={2}
                    direction="horizontal"
                    showDateDisplay={false}
                    rangeColors={['#4266b3']}
                    minDate={new Date()}
                    locale={vi}
                />

                <div style={{ marginTop: 16 }}>
                    {selectedRange.startDate && selectedRange.endDate ? (
                        <>
                            <div>
                                Ngày nhận phòng:{" "}
                                {selectedRange.startDate.toLocaleDateString("vi-VN")}
                            </div>
                            <div>
                                Ngày trả phòng:{" "}
                                {selectedRange.endDate.toLocaleDateString("vi-VN")}
                            </div>
                            <div>
                                <strong>Thời gian lưu trú:</strong>{" "}
                                {numDays === 0 ? 1 : numDays} đêm
                            </div>
                        </>
                    ) : (
                        <div>Chưa chọn ngày</div>
                    )}
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        padding: "12px 0",
                    }}
                >
                    SỐ LƯỢNG KHÁCH
                    <Button
                        shape="circle"
                        onClick={decrement}
                        disabled={guests <= 1}
                        style={{ border: "1px solid #ccc", backgroundColor: "#4266b3", color: "white" }}
                    >
                        –
                    </Button>
                    <div style={{ minWidth: "32px", textAlign: "center", fontSize: "16px" }}>
                        {guests}
                    </div>
                    <Button
                        shape="circle"
                        onClick={increment}
                        disabled={guests >= 20}
                        style={{ border: "1px solid #ccc", backgroundColor: "#4266b3", color: "white" }}
                    >
                        +
                    </Button>
                </div>

                <div style={{ textAlign: "right", marginTop: 24 }}>
                    <Button onClick={handleCancel} style={{ marginRight: 8 }}>
                        Huỷ
                    </Button>
                    <Button
                        type="primary"
                        onClick={handleOk}
                    >
                        Xác nhận
                    </Button>
                </div>
            </Modal>
        </div>
    );
}

export default BookPage;