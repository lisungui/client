import React, { useState, useEffect } from "react";
import { api, handleError } from "helpers/api";
import { useNavigate } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Home.scss";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import WelcomeSection from "./WelcomeSection";
import DashboardOverview from "./DashboardOverview";
import RecommendedGigs from "./RecommendedGigs";
import FeedbackSupport from "./FeedbackSupport";
import FeatureUpdates from "./FeatureUpdates";
import Links from "./Links";

const Home = () => {
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
    <div className="home-container">
      <WelcomeSection />
      <DashboardOverview />
      <RecommendedGigs />
      <FeatureUpdates />
      <Links />
      <FeedbackSupport />
      <div className="quick-access">
        <h3>Quick Access</h3>
        <Button onClick={() => navigate("/freelancers")} className="quick-access-button">
          Find Freelancers
        </Button>
        <Button onClick={() => navigate("/gigs")} className="quick-access-button">
          Browse Gigs
        </Button>
        <Button onClick={() => navigate("/messages")} className="quick-access-button">
          Messages
        </Button>
        <Button onClick={() => navigate("/profile")} className="quick-access-button">
          Update Profile
        </Button>
      </div>
    </div>
  );
};

export default Home;
