import axios from '../axios.customize'

const LoginUserAPI = (email, password) => {
    const URL_BACKEND = "/api/v1/auth/login";
    const data = {
        email: email,
        password: password,
        delay: 2000 //ms
    }
    return axios.post(URL_BACKEND, data);
}

const getAccountAPI = () => {
    const URL_BACKEND = "/api/v1/auth/account";
    return axios.get(URL_BACKEND);
}

const logoutAPI = () => {
    const URL_BACKEND = "/api/v1/auth/logout";
    return axios.post(URL_BACKEND);
}

const LoginGoogleAPI = async (credential) => {
    return await axios.post(
        "/api/v1/auth/google",
        { credential },
        { withCredentials: true } // để lưu cookie refresh token
    );
};

export { LoginUserAPI, getAccountAPI, logoutAPI, LoginGoogleAPI }