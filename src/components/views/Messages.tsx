import React, { useState, useEffect, useRef } from "react";
import { api, handleError } from "helpers/api";
import "../../styles/views/Messages.scss";

interface User {
  id: number;
  username: string | null;
  email: string;
  picture: string;
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [popupUser, setPopupUser] = useState<User | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const fetchMessages = async (userId: number) => {
    const fetchedMessages: Message[] = [
      { id: 1, sender: "Alice", content: "Hello!", timestamp: "10:00 AM" },
      { id: 2, sender: "You", content: "Hi Alice, how are you?", timestamp: "10:01 AM" },
      { id: 3, sender: "Alice", content: "I'm good, thanks! How about you?", timestamp: "10:02 AM" },
    ];
    setMessages(fetchedMessages);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: "You",
        content: inputMessage,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleProfileClick = (user: User) => {
    setPopupUser(user);
    setShowProfilePopup(true);
  };

  const closeProfilePopup = () => {
    setShowProfilePopup(false);
    setPopupUser(null);
  };

  return (
    <div className="messages-container">
      <div className="user-list">
        {users.map((user) => (
          <div
            key={user.id}
            className={`user-item ${selectedUser?.id === user.id ? "selected" : ""}`}
            onClick={() => setSelectedUser(user)}
          >
            <img src={user.picture} alt={user.username || user.email} className="user-picture" />
            <span className="user-name">{user.username || user.email}</span>
          </div>
        ))}
      </div>
      <div className="chat-box">
        {selectedUser ? (
          <>
            <div className="chat-header">
              <img
                src={selectedUser.picture}
                alt={selectedUser.username || selectedUser.email}
                className="chat-header-picture"
                onClick={() => handleProfileClick(selectedUser)} // Show popup on click
              />
              <span className="chat-header-name">{selectedUser.username || selectedUser.email}</span>
            </div>
            <div className="messages-list">
              {messages.map((msg) => (
                <div key={msg.id} className={`message-item ${msg.sender === "You" ? "sent" : "received"}`}>
                  <div className="message-content">{msg.content}</div>
                  <div className="message-meta">
                    <span className="sender">{msg.sender}</span>
                    <span className="timestamp">{msg.timestamp}</span>
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
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()} // Disable button if inputMessage is empty
              >
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
            <img src={popupUser.picture} alt={popupUser.username || popupUser.email} className="popup-picture" />
            <h2>{popupUser.username || popupUser.email}</h2>
            <p><strong>Email:</strong> {popupUser.email}</p>
            <button onClick={closeProfilePopup} className="close-button">OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;

