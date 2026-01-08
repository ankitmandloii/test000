// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import "./App.css";

// function App() {
//   const [socket, setSocket] = useState(null);
//   const [sender, setSender] = useState("");
//   const [receiver, setReceiver] = useState("");
//   const [message, setMessage] = useState("");
//   const [chats, setChats] = useState([]);
//   const [showWelcome, setShowWelcome] = useState(false);

//   // 🔌 Connect socket
//   useEffect(() => {
//     const socketInstance = io("http://localhost:5000");

//     setSocket(socketInstance);

//     socketInstance.on("connect", () => {
//       console.log("✅ Connected:", socketInstance.id);
//     });

//     // 📩 Receive messages
//     socketInstance.on("chat-message", (data) => {
//       setChats((prev) => [...prev, data]);
//     });

//     // 🧹 Cleanup
//     return () => {
//       socketInstance.disconnect();
//     };
//   }, []);

//   // 🚪 Join room once
//   const joinRoom = () => {
//     if (!sender || !receiver) return;


//     socket.emit("join-room", {
//       sender,
//       receiver,
//     });

//     setShowWelcome(true);
//   };

//   // 📤 Send message
//   const sendMessage = () => {
//     if (!message.trim()) return;

//     socket.emit("chat-message", {
//       sender,
//       receiver,
//       message,
//     });

//     setMessage("");
//   };

//   return (
//     <>
//       {!showWelcome && (
//         <div className="welcome">
//           <h2>Welcome To Chat App</h2>

//           <label className="label">
//             <p>Sender Name</p>
//             <input
//               type="text"
//               value={sender}
//               onChange={(e) => setSender(e.target.value)}
//             />
//           </label>

//           <label className="label">
//             <p>Receiver Name</p>
//             <input
//               type="text"
//               value={receiver}
//               onChange={(e) => setReceiver(e.target.value)}
//             />
//           </label>

//           <button
//             className="button"
//             onClick={joinRoom}
//             disabled={!sender || !receiver || !socket}
//           >
//             Enter Chat
//           </button>
//         </div>
//       )}

//       {showWelcome && (
//         <div className="chatContainer">
//           <div className="chatBox">
//             {chats.map((chat, index) => (
//               <div
//                 key={index}
//                 className={chat.sender === sender ? "sender" : "receiver"}
//               >
//                 <p className="senderName">{chat.sender}</p>
//                 <span className="message">{chat.message}</span>
//               </div>
//             ))}
//           </div>

//           <div className="inputContainer">
//             <input
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             />
//             <button onClick={sendMessage}>Send</button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'; // Import BrowserRouter as Router
import Login from './component/auth/Login';
import Signup from './component/auth/Signup';
import ProtectedRoute from './component/ProtectedRoute.jsx';
import TaskManager from './component/tasks/TaskManager.js';


const App = () => {
  
  return (
    <Router>
      <Routes>
        <></>
        <Route path='/' element={<Navigate to='/taskDashboard' />} /> {/* Redirect to /tasks */}
        <Route path="/taskDashboard" element={<ProtectedRoute><TaskManager /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} /> {/* Use element instead of component */}
        <Route path="/signup" element={<Signup />} /> Use element instead of component

      </Routes>
    </Router>
  );
};

export default App;
