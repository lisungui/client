import React, { useState, useEffect } from "react";
import "../../styles/views/WelcomeSection.scss";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";

const WelcomeSection: React.FC = () => {
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

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="welcome-section">
      <h1>Welcome Back, {user?.firstName}!</h1>
      <div className="quick-access-buttons">
        <button onClick={() => navigate(`/user/${user.uid}/create-gig`)}>Create a New Gig</button>
        <button onClick={() => navigate("/my-gigs")}>Manage My Gigs</button>
        <button onClick={() => navigate("/browse-gigs")}>Browse Gigs</button>
        <button onClick={() => navigate("/post-job")}>Post a Job</button>
      </div>
    </div>
  );
};

export default WelcomeSection;
