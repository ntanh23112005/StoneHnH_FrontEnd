import axios from "axios";
import NProgress from 'nprogress';

NProgress.configure({
    showSpinner: false,
    trickleSpeed: 100,
});


const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
});

// Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    NProgress.start();
    if (
        typeof window !== "undefined"
        && window
        && window.localStorage
        && window.localStorage.getItem('access_token')) {
        config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('access_token');
    }
    // Do something before request is sent
    return config;
}, function (error) {
    NProgress.done();
    // Do something with request error
    return Promise.reject(error);
});


// Add a response interceptor
instance.interceptors.response.use(function (response) {
    NProgress.done();
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.data && response.data.data) return response.data;

    return response;

}, async function (error) {
    NProgress.done();

    // const originalRequest = error.config;

    // // ✅ Nếu bị 401 (Unauthorized) và chưa thử refresh
    // if (
    //     error.response &&
    //     error.response.status === 401 &&
    //     !originalRequest._retry
    // ) {
    //     originalRequest._retry = true;

    //     try {
    //         // API refresh - phải enable withCredentials để gửi cookie
    //         const res = await instance.get("/api/auth/refresh", {
    //             withCredentials: true,
    //         });

    //         const newAccessToken = res.data?.accessToken;
    //         if (newAccessToken) {
    //             localStorage.setItem("access_token", newAccessToken);

    //             // gắn token mới vào request cũ
    //             originalRequest.headers.Authorization = "Bearer " + newAccessToken;

    //             // retry lại request gốc
    //             return instance(originalRequest);
    //         }
    //     } catch (refreshError) {
    //         // nếu refresh cũng fail -> redirect hoặc logout
    //         localStorage.removeItem("access_token");
    //         window.location.href = "/login";
    //         return Promise.reject(refreshError);
    //     }
    // }

    // nếu lỗi khác → trả lỗi như cũ
    if (error.response && error.response.data) return error.response.data;
    return Promise.reject(error);
}
);

export default instance;
