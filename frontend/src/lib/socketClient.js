import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const createSocket = (userId) => {
  if (!userId) return null;

  const socket = io(BASE_URL, {
    autoConnect: false,
    query: { userId },
  });

  socket.connect();

  return socket;
};

export default createSocket;
