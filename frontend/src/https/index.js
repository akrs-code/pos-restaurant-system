import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

// User APIs
export const login = data => api.post("/api/user/login", data);
export const register = data => api.post("/api/user/register", data);
export const getUserData = () => api.get("/api/user");
export const logout = () => api.post("/api/user/logout");

// Table APIs
export const addMultipleTables = number => api.post("/api/table/add-multiple", { number });
export const getTables = () => api.get("/api/table/");
export const updateTable = (id, data) => api.patch(`/api/table/${id}`, data);

// Order APIs
export const addOrder = data => api.post("/api/order/", data);
export const getOrders = () => api.get("/api/order/");
export const getOrderById = id => api.get(`/api/order/${id}`);
export const updateOrder = (id, data) => api.patch(`/api/order/${id}`, data);
export const updateOrderStatus = (id, status) => api.patch(`/api/order/${id}`, { orderStatus: status });
