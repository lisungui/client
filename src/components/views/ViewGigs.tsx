import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import "../../styles/views/ViewGigs.scss";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

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
  userCreator: string; // Assuming this field contains the creator's user ID
}

const ViewGigs: React.FC = () => {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [uid, setUid] = useState<string>(""); 
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUid(user.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchGigs = async () => {
        try {
          const response = await api.get(`/listgigs/${user.uid}`);
          setGigs(response.data);
          setLoading(false);
        } catch (error) {
          console.error(`Failed to fetch gigs: \n${handleError(error)}`);
          setLoading(false);
        }
      };

      fetchGigs();
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="view-gigs-container">
      <h2>My Gigs</h2>
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
              {/* Conditionally render the Update button if the user is logged in and is the creator of the gig */}
              {user && user.uid === gig.userCreator && (
                <button
                  className="update-button"
                  onClick={() => navigate(`/my-gigs/updategig/${uid}/${gig.id}`)}
                >
                  Update
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="no-gigs-message">
          No gigs found. <span onClick={() => navigate(`/user/${uid}/create-gig`)} className="create-gig-link">Create a Gig</span>
        </p>
      )}
    </div>
  );
};

export default ViewGigs;
