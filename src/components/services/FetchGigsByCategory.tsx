import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../../styles/services/FetchGigsByCategory.scss";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";

interface Gig {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  status: string;
  duration: string;
  createdDate: string;
  deadline: string;
  userCreator: string;
  userCreatorName: string | null;
  userCreatorEmail: string;
}

interface FetchGigsByCategoryProps {
  category: string; // Input prop for category
}

const FetchGigsByCategory: React.FC<FetchGigsByCategoryProps> = ({ category }) => {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false); // State to show/hide login popup
  const navigate = useNavigate(); // Use navigate for navigation
  const [uid, setUid] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        setUid(user.uid);
      } else {
        setUid("");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchGigs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/gigs/category/${category}`);
        setGigs(response.data);
      } catch (error) {
        console.error(`Failed to fetch gigs for category ${category}: \n${handleError(error)}`);
        setError("Failed to fetch gigs. Please try again later.");
        alert("An error occurred while fetching gigs");
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, [category]);

  if (loading) {
    return <div className="loading">Loading gigs...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const handleViewDetails = (gigId: string) => {
    navigate(`/gigs/${gigId}`);
  };

  const handleContact = (userCreatorId: string) => {
    if (user) {
      navigate(`/messages/${uid}/${userCreatorId}`);
    } else {
      setShowLoginPopup(true);
    }
  };

  const closePopup = () => {
    setShowLoginPopup(false);
  };

  return (
    <div className="fetch-gigs-by-category">
      <h2>Gigs in {category}</h2>
      {gigs.length > 0 ? (
        <div className="gigs-list">
          {gigs.map((gig) => (
            <div key={gig.id} className="gig-card">
              <h3>{gig.title}</h3>
              <p><strong>Category:</strong> {gig.category}</p>
              <p><strong>Price:</strong> ${gig.price.toFixed(2)}</p>
              <p><strong>Status:</strong> {gig.status}</p>
              <p><strong>Duration:</strong> {gig.duration}</p>
              <p><strong>Created:</strong> {new Date(gig.createdDate).toLocaleDateString()}</p>
              <p><strong>Deadline:</strong> {new Date(gig.deadline).toLocaleDateString()}</p>
              <p><strong>Description:</strong> {gig.description}</p>
              {/* Conditionally render creator's name or email */}
              <p>
                <strong>Created By:</strong> {gig.userCreatorName || gig.userCreatorEmail}
              </p>
              <div className="buttons">
                <button className="view-details" onClick={() => handleViewDetails(gig.id)}>View Details</button>
                <button className="contact" onClick={() => handleContact(gig.creator)}>Contact</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No gigs found in this category.</p>
      )}

      {/* Popup for login or account creation */}
      {showLoginPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Please Login or Create an Account</h3>
            <p>To contact the desired person, please login or create an account.</p>
            <div className="popup-buttons">
              <button onClick={() => navigate("/login")}>Login</button>
              <button onClick={() => navigate("/register")}>Create an Account</button>
            </div>
            <button className="close-button" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FetchGigsByCategory;