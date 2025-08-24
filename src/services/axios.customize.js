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

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    NProgress.start();
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
        config.headers.Authorization = 'Bearer ' + accessToken;
    }
    return config;
}, function (error) {
    NProgress.done();
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    NProgress.done();
    if (response.data && response.data.data) return response.data;
    return response;
}, async function (error) {
    NProgress.done();

    const originalRequest = error.config;

    // ✅ Chỉ xử lý refresh token khi có lỗi 401 và chưa thử refresh
    if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
    ) {
        originalRequest._retry = true;

        // ✅ QUAN TRỌNG: Chỉ gọi refresh khi đã có token trước đó (đã từng login)
        const hadToken = localStorage.getItem('access_token');
        
        if (hadToken) {
            try {
                // API refresh - phải enable withCredentials để gửi cookie
                const res = await instance.get("/api/v1/auth/refresh", {
                    withCredentials: true,
                });

                const newAccessToken = res.data?.accessToken;
                if (newAccessToken) {
                    localStorage.setItem("access_token", newAccessToken);

                    // gắn token mới vào request cũ
                    originalRequest.headers.Authorization = "Bearer " + newAccessToken;

                    // retry lại request gốc
                    return instance(originalRequest);
                }
            } catch (refreshError) {
                // nếu refresh cũng fail -> redirect hoặc logout
                localStorage.removeItem("access_token");
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        } 
        // else {
        //     // Nếu chưa từng có token (chưa login) thì redirect đến login
        //     window.location.href = "/login";
        //     return Promise.reject(error);
        // }
    }

    // nếu lỗi khác → trả lỗi như cũ
    if (error.response && error.response.data) return error.response.data;
    return Promise.reject(error);
});

export default instance;