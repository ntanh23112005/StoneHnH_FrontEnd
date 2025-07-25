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

export const getOwnerMonthlyRevenue = async (customerId, year) => {
    const response = await axios.get(`/api/v1/owners/${customerId}/monthly-revenue`, {
        params: { year },
    });
    return response.data;
};

export const getOwnerHomestays = async (customerId) => {
    const response = await axios.get(`/api/v1/owners/${customerId}/homestays`);
    return response.data;
};

// Tạo mới homestay
export const createHomestay = async (data) => {
    const response = await axios.post("/api/v1/homestay", data);
    return response.data;
};

// Cập nhật homestay
export const updateHomestay = async (homestayId, data) => {
    const response = await axios.put("/api/v1/homestay", data, {
        params: { homestayId },
    });
    return response.data;
};

// Xóa homestay
export const deleteHomestay = async (homestayId) => {
    const response = await axios.delete("/api/v1/homestay", {
        params: { homestayId },
    });
    return response.data;
};

// Lấy chi tiết homestay
export const getHomestayDetail = async (homestayId) => {
    const response = await axios.get(`/api/v1/homestay/${homestayId}`);
    return response.data;
};

// Thêm ảnh
export const createHomestayImage = async (data) => {
    const response = await axios.post("/api/v1/homestay-image", data);
    return response.data;
};

// Cập nhật ảnh
export const updateHomestayImage = async (id, data) => {
    const response = await axios.put(`/api/v1/homestay-image/${id}`, data);
    return response.data;
};

// Xóa ảnh
export const deleteHomestayImage = async (imageId) => {
    const response = await axios.delete(`/api/v1/homestay-image/${imageId}`);
    return response.data;
};

// Lấy ảnh theo homestayId
export const getHomestayImagesByHomestayId = async (homestayId) => {
    const response = await axios.get(`/api/v1/homestay-image/by-homestay/${homestayId}`);
    return response.data;
};

// Thêm quy tắc
export const createHomestayRule = async (data) => {
    const response = await axios.post("/api/v1/homestay-rule", data);
    return response.data;
};

// Cập nhật quy tắc
export const updateHomestayRule = async (id, data) => {
    const response = await axios.put(`/api/v1/homestay-rule/${id}`, data);
    return response.data;
};

// Xóa quy tắc
export const deleteHomestayRule = async (ruleId) => {
    const response = await axios.delete(`/api/v1/homestay-rule/${ruleId}`);
    return response.data;
};

// Lấy quy tắc theo homestayId
export const getHomestayRuleByHomestayId = async (homestayId) => {
    const response = await axios.get(`/api/v1/homestay-rule/by-homestay/${homestayId}`);
    return response.data;
};

//thêm mới owner
export const createOwner = async (ownerData) => {
    const response = await axios.post("/api/v1/owners", ownerData);
    return response.data;
};

export const acceptBooking = async (bookingId) => {
    const response = await axios.patch(`/api/v1/bookings/${bookingId}/accept-payment`);
    return response.data;
};