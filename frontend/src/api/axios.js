import axios from "axios";

const API = axios.create({
  baseURL: "http://YOUR_NEW_EC2_PUBLIC_IP:5000",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;
