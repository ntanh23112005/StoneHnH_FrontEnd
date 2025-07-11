import axios from '../axios.customize';

const getAllStats = () => {
    const URL_BACKEND = "/api/v1/admin/stats";
    return axios.get(URL_BACKEND, {
        withCredentials: true
    })
}

const getMonthlyRevenue = () => {
    const year = new Date().getFullYear();
    const URL_BACKEND = `/api/v1/admin/monthly-revenue?year=${year}`;
    return axios.get(URL_BACKEND, {
        withCredentials: true
    })
}

const getBookingRatio = () => {
    const URL_BACKEND = "/api/v1/admin/bookings-ratio";
    return axios.get(URL_BACKEND, {
        withCredentials: true
    })
}

const getAllUsers = (email) => {
    const URL_BACKEND = email
        ? `/api/v1/admin/users?email=${encodeURIComponent(email)}`
        : "/api/v1/admin/users";

    return axios.get(URL_BACKEND, {
        withCredentials: true
    });
};

const createNewUser = (creationCustomer) => {
    const URL_BACKEND = "/api/v1/admin/users";
    return axios.post(URL_BACKEND, creationCustomer, {
        withCredentials: true
    })
}

const updateUser = (creationCustomer) => {
    const URL_BACKEND = "/api/v1/admin/users";
    return axios.put(URL_BACKEND, creationCustomer, {
        withCredentials: true
    })
}

const getBookingById = (bookingId) => {
    const URL_BACKEND = `/api/v1/bookings/${bookingId}`;
    return axios.get(URL_BACKEND, {
        withCredentials: true
    });
};

const getAllBookings = () => {
    return axios.get("/api/v1/bookings", {
        withCredentials: true
    });
};

const getAllHomestays = (limit = 10, offset = 0) => {
    return axios.get("/api/v1/admin/homestays", {
        params: {
            limit,
            offset
        },
        withCredentials: true
    });
};

const updateHomestayStatus = (homestayId, status) => {
    const URL_BACKEND = `/api/v1/admin/homestays/${homestayId}/status`;
    return axios.put(URL_BACKEND, { status }, {
        withCredentials: true
    });
};

export { createNewUser, getAllBookings, getAllHomestays, getAllStats, getAllUsers, getBookingById, getBookingRatio, getMonthlyRevenue, updateHomestayStatus, updateUser };

