import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "../../styles/views/Header.scss"; // Import the SCSS file
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { Button } from "components/ui/Button";
import { api, handleError } from "helpers/api";

const Header: React.FC<{ height?: string }> = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [picture, setPicture] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUserProfilePicture(user.uid); // Fetch user profile picture
      } else {
        setUser(null);
        setPicture(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const navigateToHome = () => {
    navigate("/home");
  };

  const navigateToCreateFreelance = async () => {
    try {
      const response = await api.post("/createfreelance", { uid: user.uid });
      navigate("/freelancers");
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
    }
  };

  const fetchUserProfilePicture = async (uid: string) => {
    try {
      const response = await api.get(`/users/${uid}`);
      setPicture(response.data.photoUrl);
    } catch (error) {
      console.error("Failed to fetch user profile picture:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="header" style={{ height: props.height }}>
      <div className="left-section">
        <h1 className="title">Lisungui</h1> {/* Title is not a clickable link */}
      </div>
      <div className="middle-section">
        {user && (
          <>
            <Button onClick={navigateToHome} className="nav-button">
              Home
            </Button>
            <Button onClick={navigateToCreateFreelance} className="nav-button">
              Join as a Freelancer
            </Button>
          </>
        )}
        <Button onClick={() => navigate("/about")} className="nav-button">
          About
        </Button>
        <Button onClick={() => navigate("/contact")} className="nav-button">
          Contact Us
        </Button>
        {user && (
          <Button onClick={handleLogout} className="nav-button">
            Logout
          </Button>
        )}
      </div>
      <div className="right-section">
        {user ? (
          <Button className="profile-button" onClick={() => navigate(`/user/${user.uid}`)}>
            {picture ? (
              <img src={picture} alt="Profile" className="profile-picture" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="user-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            )}
          </Button>
        ) : (
          <>
            <Button onClick={() => navigate("/register")} className="nav-button">
              Register
            </Button>
            <Button onClick={() => navigate("/login")} className="nav-button">
              Login
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

Header.propTypes = {
  height: PropTypes.string,
};

export default Header;
