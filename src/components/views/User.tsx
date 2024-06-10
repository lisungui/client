import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import { Button } from "components/ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/User.scss";
import { auth, signOut } from "../../firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";

const UserDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
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

  const handleViewProfile = () => {
    navigate(`/profile/${id}`); // Replace with your actual route for the profile view page
  };

  const handleUpdateProfile = () => {
    navigate(`/update/${id}`); // Replace with your actual route for the update profile page
  };

  return (
    <BaseContainer className="user-container">
      <h1>Welcome to Your Profile!</h1>
      <p>
        Customizing your profile helps you to showcase your skills and interests effectively. It allows others to know more about you and your expertise. A well-detailed profile increases your chances of getting noticed and hired for projects.
      </p>
      <p>
        Here’s why it’s important to keep your profile up to date:
      </p>
      <ul>
        <li><strong>First Impressions:</strong> Your profile is the first thing potential clients see. Make sure it reflects your best self.</li>
        <li><strong>Skills and Expertise:</strong> Highlighting your skills can attract clients looking for your specific expertise.</li>
        <li><strong>Contact Information:</strong> Keeping your contact details current ensures clients and colleagues can reach you easily.</li>
        <li><strong>Languages:</strong> Indicating the languages you speak can broaden your reach to a global audience.</li>
        <li><strong>Location:</strong> Adding your city or region helps in local networking and finding nearby opportunities.</li>
      </ul>
      <div className="button-group">
        <button className="view-profile-button" onClick={handleViewProfile}>
          View Profile
        </button>
        <button className="update-profile-button" onClick={handleUpdateProfile}>
          Update Profile
        </button>
      </div>
    </BaseContainer>
  );
};

export default UserDetails;


// import React, { useEffect, useState } from "react";
// import { api, handleError } from "helpers/api";
// import { Spinner } from "components/ui/Spinner";
// import { Button } from "components/ui/Button";
// import { useNavigate } from "react-router-dom";
// import BaseContainer from "components/ui/BaseContainer";
// import PropTypes from "prop-types";
// import "styles/views/Game.scss";
// import { auth, signOut } from "../../firebaseConfig";
// import { onAuthStateChanged, User } from "firebase/auth";

// const Player = ({ user }: { user: User }) => (
//   <div className="player container">
//     <div className="player username">{user?.phoneNumber}</div>
//     <div className="player name">{user?.displayName}</div>
//     <div className="player id">id: {user?.uid}</div>
//   </div>
// );

// Player.propTypes = {
//   user: PropTypes.object,
// };

// const UserDetail = () => {
//   // use react-router-dom's hook to access navigation, more info: https://reactrouter.com/en/main/hooks/use-navigate
//   const navigate = useNavigate();
//   const [user, setUser] = useState<User | null>(null);
//   const [userData, setUserData] = useState<any>(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUser(user);
//       } else {
//         setUser(null);
//       }
//     });

//     // Clean up the subscription on unmount
//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     async function fetchData() {
//       if (user) {
//         try {
//           const response = await api.get(`/users/${user.uid}`);
//           setUserData(response.data);
//         } catch (error) {
//           console.error(`Something went wrong while fetching the user details: \n${handleError(error)}`);
//           console.error("Details:", error);
//           const errorMessage =
//             error.response?.data?.message ||
//             error.response?.data ||
//             error.message ||
//             "An unknown error occurred";
//           alert(`${errorMessage}`);
//         }
//       }
//     }

//     fetchData();
//   }, [user]);

//   const formatBase64Image = (base64) => {
//     if (!base64.startsWith("data:image/")) {
//       return `data:image/jpeg;base64,${base64}`;
//     }

//     return base64;
//   };

//   const formatDate = (inputDate) => {
//     const date = new Date(inputDate);

//     return date.toLocaleDateString("de-CH", {
//       year: "numeric",
//       month: "numeric",
//       day: "numeric",
//     });
//   };

//   let content = <Spinner />;

//   if (userData) {
//     content = (
//       <div className="game">
//         {userData.picture && (
//           <div className="picture" style={{ marginTop: "10px", textAlign: "center" }}>
//             <img
//               src={formatBase64Image(userData.picture)}
//               alt="Profile Pic"
//               style={{
//                 borderRadius: "50%",
//                 width: "150px",
//                 height: "150px",
//                 align: "auto",
//               }}
//             />
//           </div>
//         )}
//         <ul className="game user-list">
//           <li key={userData.id}>
//             <div className="player container">
//               <div className="player ">id: {userData.uid}</div>
//             </div>
//           </li>
//           <li key={userData.username}>
//             <div className="player container">
//               <div className="player username">fullname: {userData.displayName}</div>
//             </div>
//           </li>
//           <li key={userData.email}>
//             <div className="player container">
//               <div className="player email">email: {userData.email}</div>
//             </div>
//           </li>
//           <li key={userData.birthDay}>
//             <div className="player container">
//               <div className="player birthdate">birthdate: {userData.birthDay}</div>
//             </div>
//           </li>
//           <li key={userData.status}>
//             <div className="player container">
//               <div className="player status">status: {userData.status}</div>
//             </div>
//           </li>
//           <li key={userData.createdAt}>
//             <div className="player container">
//               <div className="player createdAt">createdAt: {formatDate(userData.createDate)}</div>
//             </div>
//           </li>
//         </ul>
//         <Button
//           width="100%"
//           style={{ marginBottom: "10px" }}
//           onClick={() => navigate(`/user/${user?.uid}/change`)}
//         >
//           Edit
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <BaseContainer className="game container" style={{ background: "transparent", boxShadow: "none", paddingTop: "0" }}>
//       <h2>Your Profile</h2>
//       {content}
//     </BaseContainer>
//   );
// };

// export default UserDetail;