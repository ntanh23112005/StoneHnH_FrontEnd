import axios from "../axios.customize";

const fetchAllHomeStayAPI = () => {
    const URL_BACKEND = '/api/v1/homestay';
    return axios.get(URL_BACKEND);
}

export { fetchAllHomeStayAPI }