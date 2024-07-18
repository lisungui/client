import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "../../styles/views/Header.scss"; // Import the SCSS file
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { Button } from "components/ui/Button";
import { api, handleError } from "helpers/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Header: React.FC<{ height?: string }> = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [picture, setPicture] = useState<string | null>(null);
  const [userData, setUserData] = useState<any | null>(null);

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
    navigate(user ? "/home" : "/");
  };

  const fetchUserProfilePicture = async (uid: string) => {
    try {
      const response = await api.get(`/users/${uid}`);
      setPicture(response.data.picture);
      setUserData(response.data);
    } catch (error) {
      console.error("Failed to fetch user profile picture:", error);
    }
  };

  const handleNavigateFreelancer = () => {
    if (userData && userData.role === "freelancer") {
      navigate(`/freelancers/${user.uid}/details`);
    } else {
      navigate("/become-freelancer");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirect to home page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleNavigatePortfolio = async () => {
    if (user) {
      try {
        await api.get(`/api/portfolios/${user.uid}`);
        navigate("/portfolio");
      } catch (error) {
        if (error.response && error.response.status === 404) {
          navigate("/portfolio/introduction");
        }
      }
    }
  };

  return (
    <div className="header" style={{ height: props.height }}>
      <div className="left-section" onClick={navigateToHome} style={{ cursor: "pointer" }}>
        <h1 className="title">Lisungui</h1>
      </div>
      <div className="middle-section">
        <Button onClick={navigateToHome} className="nav-button">
          Home
        </Button>
        <Button onClick={() => navigate("/forum")} className="nav-button">
          Forum
        </Button>
        {user && (
          <>
            <Button onClick={() => navigate("/dashboard")} className="nav-button">
              Dashboard
            </Button>
            <Button onClick={() => navigate("/my-gigs")} className="nav-button">
              My Gigs
            </Button>
            <Button onClick={handleNavigateFreelancer} className="nav-button">
              Freelancing
            </Button>
            <Button onClick={() => navigate("/messages")} className="nav-button">
              Messages
            </Button>
            {userData && userData.role === "freelancer" && (
              <Button onClick={handleNavigatePortfolio} className="nav-button">
                Portfolio
              </Button>
            )}
          </>
        )}
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
          <div className="profile-dropdown">
            <Button className="profile-button" onClick={() => navigate(`/user/${user.uid}`)}>
              {picture ? (
                <img src={picture} alt="Profile" className="profile-picture" />
              ) : (
                <FontAwesomeIcon icon={faUserCircle} size="2x" />
              )}
            </Button>
            <div className="dropdown-content">
              <a onClick={() => navigate("/settings")}>Settings</a>
              <a onClick={handleLogout}>
                Logout <FontAwesomeIcon icon={faSignOutAlt} />
              </a>
            </div>
          </div>
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


