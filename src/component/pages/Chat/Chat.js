// import React, { useState, useEffect } from "react";
// import { database } from "../../../FirebaseConfig";

// const Chat = () => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const messagesRef = database.ref("messages");
//     messagesRef.on("value", (snapshot) => {
//       if (snapshot.val()) {
//         setMessages(Object.values(snapshot.val()));
//       }
//     });

//     return () => {
//       messagesRef.off();
//     };
//   }, []);

//   const sendMessage = () => {
//     if (message.trim() === "") return;
//     const newMessage = {
//       text: message,
//       timestamp: new Date().getTime(),
//     };

//     database.ref("messages").push(newMessage);
//     setMessage("");
//   };

//   return (
//     <div>
//       <h2>Chat</h2>
//       <div>
//         {messages.map((msg, index) => (
//           <div key={index}>
//             {msg.text} - {new Date(msg.timestamp).toLocaleString()}
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         placeholder="Type your message"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default Chat;
