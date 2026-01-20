import { axiosInstance } from "./axios";

const handleError = (err) => {
  const message =
    err?.response?.data?.message || err.message || "An error occurred";
  const error = new Error(message);
  error.status = err?.response?.status;
  throw error;
};

export const api = {
  get: async (url, config) => {
    try {
      const res = await axiosInstance.get(url, config);
      return res.data;
    } catch (err) {
      handleError(err);
    }
  },
  post: async (url, data, config) => {
    try {
      const res = await axiosInstance.post(url, data, config);
      return res.data;
    } catch (err) {
      handleError(err);
    }
  },
  put: async (url, data, config) => {
    try {
      const res = await axiosInstance.put(url, data, config);
      return res.data;
    } catch (err) {
      handleError(err);
    }
  },
};

export default api;
