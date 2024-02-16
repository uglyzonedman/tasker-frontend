import axios from "axios";
import Cookies from "js-cookie";
export const URL = `http://localhost:7777/api-v2`;

export const $apiWithToken = axios.create({
  withCredentials: true,
  baseURL: URL,
});

export const $apiWithoutToken = axios.create({
  withCredentials: true,
  baseURL: URL,
});

$apiWithToken.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${Cookies.get("accessToken")}`;
  return config;
});
