import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { useParams, useNavigate } from "react-router-dom";
import "styles/views/UserProfile.scss";

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // Hook to handle navigation
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/users/${id}`);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(
          `Something went wrong while fetching the user data**********: \n${handleError(error)}`
        );
        console.error("Details:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No user data available</div>;
  }

  const formatBase64Image = (base64: string) => {
    if (!base64.startsWith("data:image/")) {
      return `data:image/jpeg;base64,${base64}`;
    }
    
    return base64;
  };

  return (
    <div className="user-profile-container">
      <div className="user-profile-card">
        {userData.picture && (
          <img
            src={userData.picture}
            alt="Profile"
            className="profile-picture"
          />
        )}
        <h2>{userData.displayName}</h2>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Username:</strong> {userData.username}</p>
        <p><strong>Phone:</strong> {userData.phoneNumber}</p>
        <p><strong>Birthday:</strong> {userData.birthDay}</p>
        <p><strong>Languages:</strong> {userData.languages?.join(", ") || "N/A"}</p>
        <p><strong>Address:</strong> {userData.address}</p>
        <p><strong>City:</strong> {userData.city}</p>
        <p><strong>Country:</strong> {userData.country}</p>
        <p><strong>Interests:</strong> {userData.interest || "N/A"}</p>
        {/* Home button to navigate back to the home page */}
        <button className="home-button" onClick={() => navigate("/home")}>
          Home
        </button>
      </div>
    </div>
  );
};

export default UserProfile;

