import axios from 'axios';
import { PATH_API } from '../api/path.ts';

const api = axios.create({
  baseURL: PATH_API.API_DOMAIN,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials:true, // 쿠키 cors 통신 설정
});

api.interceptors.request.use(
  (config) => {
    // 요청 전 처리
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 오류 응답 처리
    if (error.response && error.response.status === 401) {
      // 인증 오류 처리
      localStorage.removeItem('accessToken');
    }
    return Promise.reject(error);
  },
);

export default api;
