import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api, handleError } from "helpers/api";
import "styles/views/Freelance.scss";
import BaseContainer from "components/ui/BaseContainer";
import { Button } from "components/ui/Button";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const ViewFreelance = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUserData(user.uid);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (uid) => {
    try {
      const response = await api.get(`/users/details/${uid}`);
      const userData = response.data;
      setUser(userData);
    } catch (error) {
      console.error(
        `Something went wrong while fetching the user data: \n${handleError(error)}`
      );
      console.error("Details:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "An unknown error occurred";
      alert(`${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <BaseContainer>
      <div className="view container">
        <h2>Freelance Profile</h2>
        <div className="view field">
          <label className="view label">First Name:</label>
          <span>{user.firstName}</span>
        </div>
        <div className="view field">
          <label className="view label">Last Name:</label>
          <span>{user.lastName}</span>
        </div>
        <div className="view field">
          <label className="view label">Skills:</label>
          <span>{user.skills ? user.skills.join(", ") : "N/A"}</span>
        </div>
        <div className="view field">
          <label className="view label">Languages:</label>
          <span>{user.languages ? user.languages.join(", ") : "N/A"}</span>
        </div>
        <div className="view field">
          <label className="view label">Courses:</label>
          <span>{user.courses ? user.courses.join(", ") : "N/A"}</span>
        </div>
        <div className="view field">
          <label className="view label">City:</label>
          <span>{user.city}</span>
        </div>
        <div className="view field">
          <label className="view label">Phone Number:</label>
          <span>{user.phone}</span>
        </div>
        <div className="view button-container">
          <Button width="40%" onClick={() => navigate("/freelancers")}>
            Edit Freelance Profile
          </Button>
        </div>
      </div>
    </BaseContainer>
  );
};

export default ViewFreelance;
