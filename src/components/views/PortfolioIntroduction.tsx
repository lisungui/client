import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api, handleError } from "helpers/api";
import "../../styles/views/PortfolioIntroduction.scss";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebaseConfig";
  
const PortfolioIntroduction: React.FC = () => {
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

  const handleStartCreating = async () => {
    if (user) {
      try {
        await api.post(`/api/portfolios/create?freelancerId=${user.uid}`);
        navigate("/portfolio");
      } catch (createError) {
        console.error("Failed to create portfolio:", handleError(createError));
      }
    }
  };

  return (
    <div className="portfolio-introduction">
      <h2>Why Create a Portfolio?</h2>
      <p>
        As a freelancer, having a well-crafted portfolio is crucial for showcasing your work to potential clients. It demonstrates your skills, experience, and the quality of your work, making it easier for clients to trust you with their projects.
      </p>
      <p>
        A portfolio helps you stand out in a competitive market by providing concrete examples of what you can do. It increases your visibility and can lead to more job offers, higher rates, and better opportunities.
      </p>
      <p>
        Start creating your portfolio today to enhance your profile and attract more clients!
      </p>
      <button onClick={handleStartCreating} className="start-button">Start Creating Your Portfolios</button>
    </div>
  );
};

export default PortfolioIntroduction;