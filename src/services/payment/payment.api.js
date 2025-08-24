import axios from "../axios.customize";
import { findCustomerBankByCustomerId } from "./payment-firebase";

const API_BASE_URL = "/api/v1/payments";

export const createPayment = async (data) => {
  try {
    const response = await axios.post("/api/v1/payments", data, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getPaymentsByCustomerId = (customerId) => {
  return axios.get(`${API_BASE_URL}/by-customer/${customerId}`, {
    withCredentials: true,
  });
};

export const deleteBookingById = (bookingId) => {
  return axios
    .delete(`/api/v1/bookings/${bookingId}`, { withCredentials: true })
    .then((res) => res.data)
    .catch((err) => {
      throw err.response?.data || err;
    });
};
