import React from "react";
import "../../styles/views/RecommendedGigs.scss";

const RecommendedGigs: React.FC = () => {
  return (
    <div className="recommended-gigs">
      <h2>Recommended for You</h2>
      <div className="gigs-list">
        {/* Placeholder for dynamic data */}
        <div className="gig-card">
          <h3>Gig Title 1</h3>
          <p>Description of the gig...</p>
          <button>View Details</button>
        </div>
        <div className="gig-card">
          <h3>Gig Title 2</h3>
          <p>Description of the gig...</p>
          <button>View Details</button>
        </div>
        {/* Add more gig cards as needed */}
      </div>
    </div>
  );
};

export default RecommendedGigs;