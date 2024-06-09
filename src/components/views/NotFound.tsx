// NotFound.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import "../../styles/views/NotFound.scss";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const navigateToHome = () => {
    navigate(user ? "/home" : "/");
  };

  return (
    <div className="notfound-container">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button onClick={navigateToHome}>Go to Home</button>
    </div>
  );
};

export default NotFound;