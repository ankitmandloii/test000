import { BrowserRouter as Router, Route } from 'react-router-dom';
import EmailTriggerPage from './pages/EmailTriggerPage';
import { io } from "socket.io-client";
import { useEffect, useState } from 'react';
import "./App.css"
function App() {
  const [socket, setSocket] = useState(null);
  const [sender, setSender] = useState();
  const [reciever, setReciever] = useState();
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  useEffect(() => {
    const socket = io("http://localhost:8080");
    setSocket(socket);

    socket?.on("connect", () => {
      console.log(socket.id, "connection established");
    });

    // socket?.on("disconnect", () => {
    //   console.log(socket.id); // undefined
    // });

    socket?.on("chat-message", (sender, reciever, message) => {
      console.log("chat-message called", sender, reciever, message);
      setChats((prev) => ([...prev, { sender, reciever, message }]));
    })


    return

  }, [])

  function sendMessage(message) {
    if (message == "") {
      alert("please write something!");
      return;
    }
    socket.emit("chat-message", sender, reciever, message);
    setChats((prev) => ([...prev, { sender, reciever, message }]))
    setMessage("");
  }

  return (
    //  <EmailTriggerPage/>
    <>

      {
        !showWelcome && <div className='welcome'>
          <h2>Welcome To Chat App</h2>
          <label className='lable'>
            <p className='nameLable'>Enter sender name</p>
            <input type='text' onChange={(e) => setSender(e.target.value)}></input>
          </label>
          <label className='lable'>
            <p className='nameLable'>Enter reciever name</p>
            <input type='text' onChange={(e) => setReciever(e.target.value)}></input>
          </label>
        <button onClick={() => {
          if(sender && reciever){
            setShowWelcome(true)
          }
        }}  className='Button' disabled={ !sender || !reciever}>Enter</button>

        </div>
      }
 
 {
  showWelcome && <div className='chatContainer'>
      <div className='chatBox'>
        {chats.map((chat) => {
          return <div className={sender == chat.sender ? "sender" :"reciever"}>
            <p className='senderName'>{chat.sender}</p>
            <span className={sender == chat.sender ? "sender message" :"reciever message"} > {chat.message}</span>
          </div>
        })}
      </div>
      <label className='inputContainer'>
        <input type='text' value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => {
          if(e.key == "Enter"){
            sendMessage(message)
          }
        }}></input>
        <button onClick={() => sendMessage(message)} disabled={!socket}>send</button>
      </label>

  </div>
 }

    </>
  );
}

export default App;
