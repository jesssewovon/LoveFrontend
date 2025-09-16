// api.js
import axios from "axios";

import { store } from "./store/index";
import { loggedUserOut, setSettings } from "./store/userSlice";

import { navigate } from "./navigationService";

//axios.defaults.baseURL = import.meta.env.VITE_APP_BACKEND_URL

const api = axios.create({
  //baseURL: "https://testnet-backend.piketplace.com/api/v1",
  baseURL: import.meta.env.VITE_APP_BACKEND_URL,
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
    const token = store.getState().user?.token; // 👈 access store var
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
  (response) => {
    console.log('interceptors api', response.data)
    /* if(response.data.redirectTo || response.data.current_user_for_automatic_update.has_profile===false) {
        alert('redirectTo')
    } */
    if (response.data.settings_user) {
      store.dispatch(setSettings(response.data.settings_user));
    }
    return response;
  },
  async (error) => {
    console.log('error interceptor', error.response)
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
    if(error.response?.status === 403) {
        /* if(error.response?.data.redirectTo) {
            alert(error.response?.data.redirectTo)
        } */
    }
    return Promise.reject(error);
  }
);

export default api;
