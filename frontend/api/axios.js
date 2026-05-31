import axios from "axios";
import { getCookie } from "cookies-next";

const axiosInstance = axios.create({
  baseURL: "https://blog-app-5ao6.onrender.com",
});

axiosInstance.interceptors.request.use(
  function (config) {
    const accesstoken = getCookie("accesstoken");
    // console.log(accesstoken, "accesstoken");
    if (accesstoken) {
      config.headers["x-access-token"] = accesstoken 
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosInstance;
