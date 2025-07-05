import axios from '../axios.customize';

const createBookingWithDetail = (booking, bookingDetail) => {
    const URL_BACKEND = '/api/v1/bookings';
    return axios.post(URL_BACKEND, {
        booking,
        bookingDetail,
    });
}

const getBookingDetailByHomeStayId = (homestayId) => {
    const URL_BACKEND = "/api/v1/booking-details"
    return axios.get(URL_BACKEND, {
        params: {
            homestayId: homestayId
        }
    });
}

export { createBookingWithDetail, getBookingDetailByHomeStayId }