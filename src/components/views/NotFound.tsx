// NotFound.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/views/NotFound.scss";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="notfound-container">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button onClick={() => navigate("/")}>Go to Home</button>
    </div>
  );
};

export default NotFound;