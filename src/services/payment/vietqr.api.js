import axios from "axios";

const VIETQR_API_URL = 'https://api.vietqr.io/v2/banks';

const getAllBanksInfo = () => {
    return axios.get(VIETQR_API_URL);
};

export { getAllBanksInfo };