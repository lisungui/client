import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import { Button } from "components/ui/Button";
import { useNavigate } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
import { auth, signOut } from "../../firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";

const Player = ({ user }: { user: User }) => (
  <div className="player container">
    <div className="player username">{user?.phoneNumber}</div>
    <div className="player name">{user?.displayName}</div>
    <div className="player id">id: {user?.uid}</div>
  </div>
);

Player.propTypes = {
  user: PropTypes.object,
};

const UserDetail = () => {
  // use react-router-dom's hook to access navigation, more info: https://reactrouter.com/en/main/hooks/use-navigate
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);

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

  useEffect(() => {
    async function fetchData() {
      if (user) {
        try {
          const response = await api.get(`/users/${user.uid}`);
          setUserData(response.data);
        } catch (error) {
          console.error(`Something went wrong while fetching the user details: \n${handleError(error)}`);
          console.error("Details:", error);
          const errorMessage =
            error.response?.data?.message ||
            error.response?.data ||
            error.message ||
            "An unknown error occurred";
          alert(`${errorMessage}`);
        }
      }
    }

    fetchData();
  }, [user]);

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userToken");
      localStorage.removeItem("username");
      localStorage.removeItem("id");
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
      alert("Error signing out. Please try again.");
    }
  };

  const formatBase64Image = (base64) => {
    if (!base64.startsWith("data:image/")) {
      return `data:image/jpeg;base64,${base64}`;
    }

    return base64;
  };

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);

    return date.toLocaleDateString("de-CH", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  let content = <Spinner />;

  if (userData) {
    content = (
      <div className="game">
        {userData.picture && (
          <div className="picture" style={{ marginTop: "10px", textAlign: "center" }}>
            <img
              src={formatBase64Image(userData.picture)}
              alt="Profile Pic"
              style={{
                borderRadius: "50%",
                width: "150px",
                height: "150px",
                align: "auto",
              }}
            />
          </div>
        )}
        <ul className="game user-list">
          <li key={userData.id}>
            <div className="player container">
              <div className="player ">id: {userData.uid}</div>
            </div>
          </li>
          <li key={userData.username}>
            <div className="player container">
              <div className="player username">fullname: {userData.displayName}</div>
            </div>
          </li>
          <li key={userData.email}>
            <div className="player container">
              <div className="player email">email: {userData.email}</div>
            </div>
          </li>
          <li key={userData.birthDay}>
            <div className="player container">
              <div className="player birthdate">birthdate: {userData.birthDay}</div>
            </div>
          </li>
          <li key={userData.status}>
            <div className="player container">
              <div className="player status">status: {userData.status}</div>
            </div>
          </li>
          <li key={userData.createdAt}>
            <div className="player container">
              <div className="player createdAt">createdAt: {formatDate(userData.createDate)}</div>
            </div>
          </li>
        </ul>
        <Button
          width="100%"
          style={{ marginBottom: "10px" }}
          onClick={() => navigate(`/user/${user?.uid}/change`)}
        >
          Edit
        </Button>
        <Button
          width="100%"
          style={{ marginBottom: "10px" }}
          onClick={() => navigate("/home")}
        >
          Home Screen
        </Button>
        <Button
          width="100%"
          style={{ marginBottom: "10px", backgroundColor: "#ff6666" }}
          onClick={logout}
        >
          Logout
        </Button>
      </div>
    );
  }

  return (
    <BaseContainer className="game container" style={{ background: "transparent", boxShadow: "none", paddingTop: "0" }}>
      <h2>Your Profile</h2>
      {content}
    </BaseContainer>
  );
};

export default UserDetail;