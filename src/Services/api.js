// const API_KEY = "e78a733c22647b4b249f47229e7c0e16";
// const BASE_URL = "https://api.themoviedb.org/3";

//endpoint
export const urls = {
    register: "/user/register",
    login: "user/login",
    home: "home/list",
};

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/",
  timeout: 10000,
});

// request interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// response interceptor
API.interceptors.response.use(
  (response) => response.data, // chỉ return data
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized, please login again");
      // ví dụ: redirect login
      // window.location.href = "/login";
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default API;
