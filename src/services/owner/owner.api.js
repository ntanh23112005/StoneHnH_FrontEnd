import axios from "../axios.customize";

export const registerOwnerRole = async (customerId) => {
    const response = await axios.post("/api/v1/owners/register-role", {
        customerId,
    });
    return response.data;
};

export const getAllBookings = async (customerId) => {
    const response = await axios.get(`/api/v1/owners/bookings/${customerId}`);
    return response.data;
};

export const getAllBookingDetails = async (customerId) => {
    const response = await axios.get(`/api/v1/owners/bookings/details/${customerId}`);
    return response.data;
};

export const getOwnerStatistics = async (customerId) => {
    const response = await axios.get(`/api/v1/owners/statistics/${customerId}`);
    return response.data;
};

export const getOwnerMonthlyRevenue = async (customerId) => {
    const response = await axios.get(`/api/v1/owners/revenue/monthly/${customerId}`);
    return response.data;
};

export const getOwnerHomestays = async (customerId) => {
    const response = await axios.get(`/api/v1/owners/${customerId}/homestays`);
    return response.data;
};