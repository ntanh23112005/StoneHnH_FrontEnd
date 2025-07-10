import axios from '../axios.customize'

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

export {
    getAllStats, getMonthlyRevenue, getBookingRatio,
    getAllUsers, createNewUser, updateUser
}