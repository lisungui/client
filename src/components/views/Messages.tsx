import React, { useState, useEffect, useRef } from "react";
import { api, handleError } from "helpers/api";
import "../../styles/views/Messages.scss";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebaseConfig"; // Import db from firebaseConfig
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { doc, onSnapshot } from "firebase/firestore"; // Import Firestore methods

interface User {
  id: string;
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
  likes: string[];
  read: boolean;
}

const Messages: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [unreadMessages, setUnreadMessages] = useState<{ [key: string]: number }>({});
  const [inputMessage, setInputMessage] = useState("");
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [popupUser, setPopupUser] = useState<User | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [uid, setUid] = useState<string | null>(null);

  const navigate = useNavigate();
  const { selectedUserId } = useParams<{ selectedUserId: string }>();

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
    if (selectedUserId && uid) {
      const user = users.find((user) => user.id === selectedUserId);
      if (user) {
        setSelectedUser(user);
        setupRealtimeListener(uid, user.id);
        markMessagesAsRead(user.id);
      }
    }
  }, [selectedUserId, users, uid]);

  useEffect(() => {
    // scrollToBottom();
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

  const setupRealtimeListener = (userId: string, otherUserId: string) => {
    const userMessagesRef = doc(db, "messages", userId);

    return onSnapshot(userMessagesRef, (doc) => {
      const data = doc.data();
      if (data && data.messages && typeof data.messages === "object") {
        const allMessages = data.messages[otherUserId] || [];
        if (Array.isArray(allMessages)) {
          const sortedMessages = allMessages.sort(
            (a: Message, b: Message) =>
              new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          );
          setMessages(sortedMessages);

          // Count unread messages
          const unreadCount = allMessages.filter((msg: Message) => !msg.read).length;
          setUnreadMessages((prev) => ({ ...prev, [otherUserId]: unreadCount }));
        } else {
          console.error("allMessages is not an array:", allMessages);
          setMessages([]);
        }
      } else {
        console.error("Data format is incorrect or missing:", data);
        setMessages([]);
      }
    });
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() && selectedUser) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: uid || "You",
        content: inputMessage,
        timestamp: new Date().toLocaleTimeString(),
        likes: [],
        read: false, // Set new message as unread
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
          likes: [],
          read: false, // Set new message as unread
        };
        await api.post("/api/messages/send", payload);
        // scrollToBottom();
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

  const handleUserSelection = (user: User) => {
    setSelectedUser(user);
    markMessagesAsRead(user.id); // Mark messages as read when selecting user
    navigate(`/messages/${uid}/${user.id}`);
  };

  const handleLike = async (messageId: number) => {
    if (!uid) return;
    try {
      const response = await api.post("/api/messages/like", null, {
        params: { messageId, userId: uid },
      });
      const updatedMessage = response.data;
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === updatedMessage.id ? updatedMessage : msg
        )
      );
    } catch (error) {
      console.error("Failed to like message:", error);
      alert("Failed to like message. Please try again later.");
    }
  };

  const markMessagesAsRead = async (contactId: string) => {
    if (!uid) return;
    try {
      // API call to mark messages as read
      await api.post("/api/messages/markAsRead", {
        userId: uid,
        contactId,
      });
      setUnreadMessages((prev) => ({ ...prev, [contactId]: 0 }));
    } catch (error) {
      console.error("Failed to mark messages as read:", error);
    }
  };

  return (
    <div className="messages-container">
      <div className="user-list">
        {users.map((user) => (
          user.id !== uid && ( // Condition to exclude the current user
            <div
              key={user.id}
              className={`user-item ${selectedUser?.id === user.id ? "selected" : ""}`}
              onClick={() => handleUserSelection(user)}
            >
              <img
                src={user.picture || "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"}
                alt={user.username || user.email}
                className="user-picture"
              />
              <span className="user-name">
                {user.username || user.email}
                {unreadMessages[user.id] > 0 && (
                  <span className="unread-count">{unreadMessages[user.id]}</span>
                )}
              </span>
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
                  <div className="message-footer">
                    <span className="timestamp">{msg.timestamp}</span>
                    <FontAwesomeIcon
                      icon={msg.likes.includes(uid) ? faSolidHeart : faRegularHeart}
                      className="like-icon"
                      onClick={() => handleLike(msg.id)}
                    />
                  </div>
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
// import { useNavigate, useParams } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
// import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";

// interface User {
//   id: string;
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
//   content: string;
//   timestamp: string;
//   likes: string[]; // Add likes array to keep track of users who liked the message
// }

// const Messages: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputMessage, setInputMessage] = useState("");
//   const [showProfilePopup, setShowProfilePopup] = useState(false);
//   const [popupUser, setPopupUser] = useState<User | null>(null);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const [uid, setUid] = useState<string | null>(null);

//   const navigate = useNavigate();
//   const { selectedUserId } = useParams<{ selectedUserId: string }>();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUid(user.uid);
//       } else {
//         setUid(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     if (selectedUserId && uid) {
//       const user = users.find((user) => user.id === selectedUserId);
//       if (user) {
//         setSelectedUser(user);
//         fetchMessageConversation(uid, user.id);
//       }
//     }
//   }, [selectedUserId, users, uid]);

//   useEffect(() => {
//     // scrollToBottom();
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

//   const fetchMessageConversation = async (userId: string, otherUserId: string) => {
//     try {
//       const response = await api.get(`/api/messages/conversation/${userId}/${otherUserId}`);
//       const fetchedMessages: Message[] = response.data;

//       // Sort messages by timestamp
//       fetchedMessages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

//       setMessages(fetchedMessages);
//       // scrollToBottom();
//     } catch (error) {
//       console.error("Failed to fetch messages:", error);
//       alert("Failed to fetch messages. Please try again later.");
//     }
//   };

//   const handleSendMessage = async () => {
//     if (inputMessage.trim() && selectedUser) {
//       const newMessage: Message = {
//         id: messages.length + 1,
//         sender: uid || "You",
//         content: inputMessage,
//         timestamp: new Date().toLocaleTimeString(),
//         likes: [], // Initialize likes as an empty array
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
//           likes: [], // Include likes in the payload
//         };
//         await api.post("/api/messages/send", payload);
//         // scrollToBottom();
//       } catch (error) {
//         console.error("Failed to send message:", error);
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

//   const handleUserSelection = (user: User) => {
//     setSelectedUser(user);
//     navigate(`/messages/${uid}/${user.id}`);
//   };

//   const handleLike = async (messageId: number) => {
//     if (!uid) return;
//     try {
//       const response = await api.post("/api/messages/like", null, {
//         params: { messageId, userId: uid },
//       });
//       const updatedMessage = response.data;
//       setMessages((prevMessages) =>
//         prevMessages.map((msg) =>
//           msg.id === updatedMessage.id ? updatedMessage : msg
//         )
//       );
//     } catch (error) {
//       console.error("Failed to like message:", error);
//       alert("Failed to like message. Please try again later.");
//     }
//   };

//   return (
//     <div className="messages-container">
//       <div className="user-list">
//         {users.map((user) => (
//           user.id !== uid && ( // Condition to exclude the current user
//             <div
//               key={user.id}
//               className={`user-item ${selectedUser?.id === user.id ? "selected" : ""}`}
//               onClick={() => handleUserSelection(user)}
//             >
//               <img
//                 src={user.picture || "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"}
//                 alt={user.username || user.email}
//                 className="user-picture"
//               />
//               <span className="user-name">{user.username || user.email}</span>
//             </div>
//           )
//         ))}
//       </div>
//       <div className="chat-box">
//         {selectedUser ? (
//           <>
//             <div className="chat-header">
//               <img
//                 src={selectedUser.picture || "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"}
//                 alt={selectedUser.username || selectedUser.email}
//                 className="chat-header-picture"
//                 onClick={() => handleProfileClick(selectedUser)}
//               />
//               <span className="chat-header-name">{selectedUser.username || selectedUser.email}</span>
//             </div>
//             <div className="messages-list">
//               {messages.map((msg) => (
//                 <div
//                   key={msg.id}
//                   className={`message-item ${msg.sender === uid ? "sent" : "received"}`}
//                 >
//                   <div className="message-content">{msg.content}</div>
//                   <div className="message-footer">
//                     <span className="timestamp">{msg.timestamp}</span>
//                     <FontAwesomeIcon
//                       icon={msg.likes.includes(uid) ? faSolidHeart : faRegularHeart}
//                       className="like-icon"
//                       onClick={() => handleLike(msg.id)}
//                     />
//                   </div>
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
//               <button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
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
//               src={popupUser.picture || "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"}
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