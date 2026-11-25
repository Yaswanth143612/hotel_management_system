import axios from "axios";

const api = axios.create({
  baseURL: "https://hotel-management-system-backend-1-g37n.onrender.com/"
});

export default api;
