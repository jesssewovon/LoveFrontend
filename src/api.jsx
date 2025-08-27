// api.js
import axios from "axios";

import { store } from "./store";
import { loggedUserOut } from "./varsSlice";

import { navigate } from "./navigationService";

const api = axios.create({
  baseURL: "https://testnet-backend.piketplace.com/api/v1",
  //withCredentials: true, // send cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // Example: add token if exists
    //const token = localStorage.getItem("token");
    const token = store.getState().vars?.token; // 👈 access store var
    //alert(token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Example: redirect to login
      store.dispatch(loggedUserOut());
      //window.location.href = "/profile";
      navigate("/profile");  // ✅ redirect on 401
      try {
        await axios.post("/signin", {}, { withCredentials: true });
        return api(error.config); // retry original request
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
