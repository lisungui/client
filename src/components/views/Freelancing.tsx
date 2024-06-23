import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/views/Freelancing.scss";
import MeetOurFreelancers from "./MeetOurFreelancer";

const Freelancing: React.FC = () => {
  const navigate = useNavigate();

  const handleBecomeFreelancerClick = () => {
    navigate("/register"); // Navigate to the registration page or relevant page
  };

  return (
    <div className="freelancing-container">
      <h1>Welcome to Lisungui Freelancing</h1>
      <p>
        Freelancing is a crucial aspect of our project Lisungui, offering flexibility and opportunities for skilled professionals to work on a variety of projects. It allows individuals to harness their talents, build their own schedules, and connect with clients globally.
      </p>
      <button className="become-freelancer-button" onClick={handleBecomeFreelancerClick}>
        Become a Freelancer
      </button>
      <p className="interesting-message">
        Joining our network of freelancers means you are stepping into a world of possibilities. Whether you are a seasoned professional or just starting, Lisungui offers a platform to grow, learn, and succeed.
      </p>
      <MeetOurFreelancers /> {/* Use the MeetOurFreelancers component here */}
    </div>
  );
};

export default Freelancing;