import { io } from "socket.io-client"

const socket = io("http://localhost:9000")
// const socket = io("http://127.0.0.1:9000");
// const socket = io("https://planetarypirates-server.onrender.com");

export default socket
