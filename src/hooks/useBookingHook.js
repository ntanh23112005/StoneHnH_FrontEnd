import { useEffect, useState } from "react";
import { getBookingDetailByHomeStayId } from "../services/booking/api.booking";
import dayjs from "dayjs";

const useBookingDates = (open, homestayId) => {
    const [disabledDates, setDisabledDates] = useState([]);

    useEffect(() => {
        const fetchDisabledDates = async () => {
            if (open && homestayId) {
                try {
                    const res = await getBookingDetailByHomeStayId(homestayId);
                    if (res.data) {
                        const disabled = res.data.flatMap(item => {
                            const start = new Date(item.checkInTime);
                            const end = new Date(item.checkOutTime);
                            const dates = [];
                            let current = new Date(start);
                            while (current <= end) {
                                dates.push(new Date(current));
                                current.setDate(current.getDate() + 1);
                            }
                            return dates;
                        });
                        setDisabledDates(disabled);
                    }
                } catch (err) {
                    console.error("Lỗi khi load ngày disable:", err);
                }
            }
        };
        fetchDisabledDates();
    }, [open, homestayId]);

    return disabledDates;
}

const useBookingGuests = (maxCustomer) => {
    const [guests, setGuests] = useState(1);
    const increment = () => setGuests(prev => Math.min(prev + 1, maxCustomer));
    const decrement = () => setGuests(prev => Math.max(prev - 1, 1));
    const resetGuests = () => setGuests(1);

    return { guests, increment, decrement, resetGuests };
}


const useBookingTime = () => {
    const [checkInTime, setCheckInTime] = useState(dayjs("14:00", "HH:mm"));
    const [checkOutTime, setCheckOutTime] = useState(dayjs("12:00", "HH:mm"));
    const resetTime = () => {
        setCheckInTime(dayjs("14:00", "HH:mm"));
        setCheckOutTime(dayjs("12:00", "HH:mm"));
    };

    return { checkInTime, setCheckInTime, checkOutTime, setCheckOutTime, resetTime };
}

export { useBookingDates, useBookingGuests, useBookingTime }