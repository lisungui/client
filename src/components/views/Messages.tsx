import React, { useState, useEffect, useRef } from "react";
import { api, handleError } from "helpers/api";
import "../../styles/views/Messages.scss";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";

interface User {
  id: string;  // Changed to string to match Firestore IDs
  username: string | null;
  email: string;
  picture: string | null;
  phone?: string;
  languages?: string[];
  country?: string;
  interest?: string;
}

interface Message {
  id: number; 
  sender: string;
  content: string;
  timestamp: string;
}

const Messages: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [popupUser, setPopupUser] = useState<User | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [uid, setUid] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser.id);
    }
  }, [selectedUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      const fetchedUsers: User[] = response.data;
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const fetchMessages = async (userId: string) => {
    try {
      const response = await api.get(`/messages/${userId}`);
      const messagesByContact: { [key: string]: Message[] } = response.data;

      const fetchedMessages: Message[] = [];

      for (const contactId in messagesByContact) {
        if (messagesByContact.hasOwnProperty(contactId)) {
          fetchedMessages.push(...messagesByContact[contactId]);
        }
      }

      fetchedMessages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

      setMessages(fetchedMessages);

      scrollToBottom();
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      alert("Failed to fetch messages. Please try again later.");
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() && selectedUser) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: uid || "You",
        content: inputMessage,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");

      try {
        const payload = {
          senderId: uid,
          recipientId: selectedUser.id,
          content: newMessage.content,
          id: newMessage.id,
          timestamp: new Date().toLocaleTimeString(),
        };
        await api.post("/sendmessage", payload);

        scrollToBottom();
      } catch (error) {
        console.error("Failed to send message:", error);
        setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== newMessage.id));
      }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleProfileClick = async (user: User) => {
    try {
      const response = await api.get(`/users/${user.id}`);
      setPopupUser(response.data);
      setShowProfilePopup(true);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  const closeProfilePopup = () => {
    setShowProfilePopup(false);
    setPopupUser(null);
  };

  return (
    <div className="messages-container">
      <div className="user-list">
        {users.map((user) => (
          user.id !== uid && (  // Condition to exclude the current user
            <div
              key={user.id}
              className={`user-item ${selectedUser?.id === user.id ? "selected" : ""}`}
              onClick={() => setSelectedUser(user)}
            >
              <img
                src={user.picture || "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"}
                alt={user.username || user.email}
                className="user-picture"
              />
              <span className="user-name">{user.username || user.email}</span>
            </div>
          )
        ))}
      </div>
      <div className="chat-box">
        {selectedUser ? (
          <>
            <div className="chat-header">
              <img
                src={selectedUser.picture || "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"}
                alt={selectedUser.username || selectedUser.email}
                className="chat-header-picture"
                onClick={() => handleProfileClick(selectedUser)}
              />
              <span className="chat-header-name">{selectedUser.username || selectedUser.email}</span>
            </div>
            <div className="messages-list">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message-item ${msg.sender === uid ? "sent" : "received"}`}
                >
                  <div className="message-content">{msg.content}</div>
                  <div className="timestamp">{msg.timestamp}</div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="message-input">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
              />
              <button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="no-user-selected">
            <p>Select a user to start a conversation</p>
          </div>
        )}
      </div>

      {showProfilePopup && popupUser && (
        <div className="profile-popup">
          <div className="popup-content">
            <img
              src={popupUser.picture || "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"}
              alt={popupUser.username || popupUser.email}
              className="popup-picture"
            />
            <h2>{popupUser.username || popupUser.email}</h2>
            <p><strong>Email:</strong> {popupUser.email}</p>
            <p><strong>Phone:</strong> {popupUser.phone || "N/A"}</p>
            <p><strong>Languages:</strong> {popupUser.languages?.join(", ") || "N/A"}</p>
            <p><strong>Country:</strong> {popupUser.country || "N/A"}</p>
            <p><strong>Interest:</strong> {popupUser.interest || "N/A"}</p>
            <button onClick={closeProfilePopup} className="close-button">OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;


// import React, { useState, useEffect, useRef } from "react";
// import { api, handleError } from "helpers/api";
// import "../../styles/views/Messages.scss";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../../firebaseConfig";

// interface User {
//   id: number;
//   username: string | null;
//   email: string;
//   picture: string | null;
//   phone?: string;
//   languages?: string[];
//   country?: string;
//   interest?: string;
// }

// interface Message {
//   id: number;
//   sender: string;
//   recipient: string;
//   content: string;
//   timestamp: string;
// }

// const Messages: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputMessage, setInputMessage] = useState("");
//   const [showProfilePopup, setShowProfilePopup] = useState(false);
//   const [popupUser, setPopupUser] = useState<User | null>(null);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const messagesListRef = useRef<HTMLDivElement>(null);
//   const [uid, setUid] = useState<string | null>(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUid(user.uid);
//         fetchMessages(user.uid); // Fetch messages when user is authenticated
//       } else {
//         setUid(null);
//       }
//     });

//     // Clean up the subscription on unmount
//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const fetchUsers = async () => {
//     try {
//       const response = await api.get("/users");
//       const fetchedUsers: User[] = response.data;
//       setUsers(fetchedUsers);
//     } catch (error) {
//       console.error("Failed to fetch users:", error);
//     }
//   };

//   const fetchMessages = async (userId: string) => {
//     try {
//       // Fetch all messages involving the logged-in user
//       const response = await api.get(`/messages/${userId}`);
//       const fetchedMessages: Message[] = response.data;
//       setMessages(fetchedMessages);

//       // Extract unique user IDs from the messages
//       const userIds = new Set<string>();
//       fetchedMessages.forEach((msg) => {
//         if (msg.sender !== userId) userIds.add(msg.sender);
//         if (msg.recipient !== userId) userIds.add(msg.recipient);
//       });

//       // Filter the user list to include only those involved in the messages
//       const involvedUsers = users.filter((user) => userIds.has(user.id.toString()));
//       setFilteredUsers(involvedUsers);

//       scrollToBottom(); // Scroll to the bottom when messages are loaded
//     } catch (error) {
//       console.error("Failed to fetch messages:", error);
//     }
//   };

//   const handleSendMessage = async () => {
//     if (inputMessage.trim() && selectedUser) {
//       const newMessage: Message = {
//         id: messages.length + 1,
//         sender: uid || "You",
//         recipient: selectedUser.id.toString(),
//         content: inputMessage,
//         timestamp: new Date().toLocaleTimeString(),
//       };
//       setMessages([...messages, newMessage]);
//       setInputMessage("");

//       try {
//         const payload = {
//           senderId: uid,
//           recipientId: selectedUser.id,
//           content: newMessage.content,
//           id: newMessage.id,
//           timestamp: new Date().toLocaleTimeString(),
//         };
//         await api.post("/sendmessage", payload);
//         // Scroll to the bottom after sending a message
//         scrollToBottom();
//       } catch (error) {
//         // Handle the error (e.g., show an error message, revert optimistic update)
//         console.error("Failed to send message:", error);
//         // Revert the optimistic update by removing the last message
//         setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== newMessage.id));
//       }
//     }
//   };

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const handleProfileClick = async (user: User) => {
//     try {
//       const response = await api.get(`/users/${user.id}`);
//       setPopupUser(response.data);
//       setShowProfilePopup(true);
//     } catch (error) {
//       console.error("Failed to fetch user details:", error);
//     }
//   };

//   const closeProfilePopup = () => {
//     setShowProfilePopup(false);
//     setPopupUser(null);
//   };

//   return (
//     <div className="messages-container">
//       <div className="user-list">
//         {filteredUsers.map((user) => (
//           <div
//             key={user.id}
//             className={`user-item ${selectedUser?.id === user.id ? "selected" : ""}`}
//             onClick={() => setSelectedUser(user)}
//           >
//             <img
//               src={user.picture || "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"} // Use default if picture is null
//               alt={user.username || user.email}
//               className="user-picture"
//             />
//             <span className="user-name">{user.username || user.email}</span>
//           </div>
//         ))}
//       </div>
//       <div className="chat-box">
//         {selectedUser ? (
//           <>
//             <div className="chat-header">
//               <img
//                 src={selectedUser.picture || "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"} // Use default if picture is null
//                 alt={selectedUser.username || selectedUser.email}
//                 className="chat-header-picture"
//                 onClick={() => handleProfileClick(selectedUser)}
//               />
//               <span className="chat-header-name">{selectedUser.username || selectedUser.email}</span>
//             </div>
//             <div className="messages-list" ref={messagesListRef}>
//               {messages.map((msg) => (
//                 <div
//                   key={msg.id}
//                   className={`message-item ${
//                     msg.sender === uid ? "sent" : "received"
//                   }`}
//                 >
//                   <div className="message-content">{msg.content}</div>
//                   <div className="timestamp">{msg.timestamp}</div>
//                 </div>
//               ))}
//               <div ref={messagesEndRef} />
//             </div>
//             <div className="message-input">
//               <input
//                 type="text"
//                 value={inputMessage}
//                 onChange={(e) => setInputMessage(e.target.value)}
//                 placeholder="Type your message..."
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") handleSendMessage();
//                 }}
//               />
//               <button
//                 onClick={handleSendMessage}
//                 disabled={!inputMessage.trim()} // Disable button if inputMessage is empty
//               >
//                 Send
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="no-user-selected">
//             <p>Select a user to start a conversation</p>
//           </div>
//         )}
//       </div>

//       {showProfilePopup && popupUser && (
//         <div className="profile-popup">
//           <div className="popup-content">
//             <img
//               src={popupUser.picture || "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"} // Use default if picture is null
//               alt={popupUser.username || popupUser.email}
//               className="popup-picture"
//             />
//             <h2>{popupUser.username || popupUser.email}</h2>
//             <p><strong>Email:</strong> {popupUser.email}</p>
//             <p><strong>Phone:</strong> {popupUser.phone || "N/A"}</p>
//             <p><strong>Languages:</strong> {popupUser.languages?.join(", ") || "N/A"}</p>
//             <p><strong>Country:</strong> {popupUser.country || "N/A"}</p>
//             <p><strong>Interest:</strong> {popupUser.interest || "N/A"}</p>
//             <button onClick={closeProfilePopup} className="close-button">OK</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Messages;