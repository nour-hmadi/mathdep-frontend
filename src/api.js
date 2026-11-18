import axios from "axios";
import API_URL from "./config";

// One place for every request to the backend.
// It adds the signed-in user's token, so admin pages don't have to repeat it.
// If the token has expired (401), it signs the user out and opens the sign-in page.
const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && sessionStorage.getItem("token")) {
      ["token", "id", "isAdmin", "first_name", "userImage"].forEach((key) => sessionStorage.removeItem(key));
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
