import axios from "../axios.customize";

const createCustomerAPI = (customer) =>
    axios.post("/api/v1/customers/register", customer, {
        withCredentials: true,
    });

const updateUserAPI = (id, customer) => {
    const URL_BACKEND = `/api/v1/customers?id=${id}`
    return axios.put(URL_BACKEND, customer, {
        withCredentials: true,
    });
}

const uploadAvatarAPI = (formData) => {
    const URL_BACKEND = "/api/v1/customers/upload-avatar";
    return axios.post(URL_BACKEND, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
    })
}

const sendVerificationCodeAPI = (email) =>
    axios.post(`/api/v1/customers/send-verification-code?email=${email}`, null, {
        withCredentials: true,
    });

const verifyEmailCodeAPI = (email, code) =>
    axios.post(
        `/api/v1/customers/verify-code?email=${email}&code=${code}`,
        null,
        {
            withCredentials: true,
        }
    );

const resetPasswordAPI = (email, newPassword) =>
    axios.post(
        `/api/v1/customers/reset-password?email=${encodeURIComponent(
            email
        )}&newPassword=${encodeURIComponent(newPassword)}`,
        null,
        {
            withCredentials: true,
        }
    );

export {
    createCustomerAPI, resetPasswordAPI, sendVerificationCodeAPI, verifyEmailCodeAPI,
    updateUserAPI, uploadAvatarAPI
}