import { create } from "zustand";
import "../lib/axios.js";
import toast from "react-hot-toast";
import createSocket from "../lib/socketClient";
import api from "../lib/api";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const data = await api.get("/auth/check");
      set({ authUser: data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      await api.post("/auth/signup", data);
      await get().checkAuth();
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      await api.post("/auth/login", data);
      await get().checkAuth();
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const resData = await api.put("/auth/update-profile", data);
      set({ authUser: resData });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error.message);
      toast.error(error.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = createSocket(authUser._id);
    if (!socket) return;

    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
