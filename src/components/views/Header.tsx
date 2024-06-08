import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/views/Header.scss";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";

const Header: React.FC<{ height?: string }> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [picture, setPicture] = useState<string | null>(null);
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

  const navigateToUser = () => {
    navigate(`/user/${user?.uid}`);
  };

  // Determine if back button should be shown
  const shouldShowBackButton = ["/lobby/join", "/lobby/create", "/user/"].some(
    (path) => {
      if (path === location.pathname) {
        return true;
      }

      if (path === "/user/") {
        return (
          location.pathname.startsWith("/user/") &&
          location.pathname.split("/").length === 3
        );
      }

      return false;
    }
  );

  // Determine if profile button should be shown
  const shouldShowProfileButton = !(
    location.pathname.includes("game") ||
    location.pathname.includes("host") ||
    location.pathname.includes("joined") ||
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/"
  );

  useEffect(() => {
    if (!shouldShowProfileButton) {
      // This condition prevents the API call on login/register pages.
      return;
    }
    async function fetchData() {
      try {
        const response = await api.get(`/users/${user?.uid}`);
        setPicture(response.data.photoUrl);
      } catch (error) {
        console.error(
          `Something went wrong while fetching the user picture: \n${handleError(
            error
          )}`
        );
        console.error("Details:", error);
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data ||
          error.message ||
          "An unknown error occurred";
        alert(`${errorMessage}`);
      }
    }

    fetchData();
  }, [user?.uid, shouldShowProfileButton]);

  const formatBase64Image = (base64: string) => {
    if (!base64.startsWith("data:image/")) {
      return `data:image/jpeg;base64,${base64}`;
    }

    return base64;
  };

  return (
    <div className="header container" style={{ height: props.height }}>
      <div className="back-button-container">
        {shouldShowBackButton && (
          <button
            className="header-button back-button"
            onClick={() => navigate(-1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 back-arrow"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back
          </button>
        )}
      </div>
      <h1 className="header title">Lisungui</h1>
      <div className="profile-button-container">
        {shouldShowProfileButton && (
          <button
            className="header-button profile-button"
            onClick={() => navigateToUser()}
          >
            {picture ? (
              <div
                className="picture"
                style={{ marginTop: "10px", textAlign: "center" }}
              >
                <img
                  // src={formatBase64Image(picture)}
                  src={picture}
                  style={{
                    borderRadius: "50%",
                    width: "90px",
                    height: "90px",
                    align: "auto",
                  }}
                />
              </div>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 user-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

Header.propTypes = {
  height: PropTypes.string,
};

export default Header;

