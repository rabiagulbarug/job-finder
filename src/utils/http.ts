import axios from 'axios';
import {API_ENDPOINTS} from "@/utils/api-endpoint";
import Cookies from "js-cookie";


const http = axios.create({
    baseURL: "https://novel-project-ntj8t.ampt.app/api",
    timeout: 30000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

async function refreshToken() {
    return http.post(API_ENDPOINTS.REFRESH, { refreshToken: await Cookies.get("refreshToken") });
}

http.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const rs = await refreshToken();
                    const { accessToken, refreshToken: refresh } = rs.data.data;
                    Cookies.set("accessToken", accessToken);
                    Cookies.set("refreshToken", refresh);
                    http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

                    return http(originalConfig);
                } catch (error:any) {
                    if (error.response.data && error.response) {
                        return Promise.reject(error.response.data);
                    }
                    if (axios.isAxiosError(error) && error.response?.status == 401) {
                        window.location.href = '/';
                    }

                    return Promise.reject(error);
                }
            }

            if (err.response.status === 403 && err.response.data) {
                return Promise.reject(err.response.data);
            }
        }

        return Promise.reject(err);
    }
);

http.interceptors.request.use(
    async (config) => {
        const accessToken = await Cookies.get('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        console.error('Interceptor Error:', error);
        return Promise.reject(error);
    }
);

export default http;
