import { io } from "socket.io-client";

export default io("http://localhost:3000", { withCredentials: true });
