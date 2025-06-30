import axios from "../axios.customize";

export const createCustomerAPI = (customer) =>
    axios.post("/api/v1/customers/register", customer, {
        withCredentials: true,
    });

export const sendVerificationCodeAPI = (email) =>
    axios.post(`/api/v1/customers/send-verification-code?email=${email}`, null, {
        withCredentials: true,
    });

export const verifyEmailCodeAPI = (email, code) =>
    axios.post(
        `/api/v1/customers/verify-code?email=${email}&code=${code}`,
        null,
        {
            withCredentials: true,
        }
    );

export const resetPasswordAPI = (email, newPassword) =>
    axios.post(
        `/api/v1/customers/reset-password?email=${encodeURIComponent(
            email
        )}&newPassword=${encodeURIComponent(newPassword)}`,
        null,
        {
            withCredentials: true,
        }
    );
