import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api, handleError } from "helpers/api";
import "../../styles/views/MeetOurFreelancer.scss";

interface Freelancer {
  id: string;
  uid: string;
  name: string;
  picture: string;
  expertise: string[];
  summary: string;
}

const MeetOurFreelancers: React.FC = () => {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFreelancers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get("/api/freelancers/all");
        setFreelancers(response.data);
      } catch (error) {
        console.error(`Failed to fetch freelancers: \n${handleError(error)}`);
        setError("Failed to fetch freelancers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFreelancers();
  }, []);

  const truncateSummary = (summary: string, maxLength: number) => {
    if (summary.length <= maxLength) return summary;

    return summary.split(" ").slice(0, maxLength).join(" ") + "...";
  };

  if (loading) {
    return <div className="loading">Loading freelancers...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="meet-our-freelancers-container">
      <h2>Meet Our Freelancers</h2>
      <div className="freelancers-list">
        {freelancers.map(freelancer => (
          <div key={freelancer.id} className="freelancer-profile">
            <img src={freelancer.picture} alt={freelancer.fullName} className="freelancer-picture" />
            <h3>{freelancer.fullName}</h3>
            <p><strong>Expertise:</strong> {freelancer.expertise.join(", ")}</p>
            <p className="description">{truncateSummary(freelancer.summary, 20)}</p>
            <button 
              className="view-detail-button" 
              onClick={() => navigate(`/freelancers/${freelancer.id}/details`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetOurFreelancers;

