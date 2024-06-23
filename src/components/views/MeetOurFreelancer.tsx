// src/components/services/MeetOurFreelancers.tsx

import React, { useState, useEffect } from "react";
import "../../styles/views/MeetOurFreelancer.scss";

interface Freelancer {
  id: string;
  name: string;
  picture: string;
  expertise: string;
  description: string;
}

// Dummy data for freelancers
const dummyFreelancers = [
  {
    id: "1",
    name: "Alice Johnson",
    expertise: "Graphic Design",
    picture: "https://randomuser.me/api/portraits/women/1.jpg",
    description: "Alice is a creative graphic designer with over 5 years of experience."
  },
  {
    id: "2",
    name: "John Smith",
    expertise: "Web Development",
    picture: "https://randomuser.me/api/portraits/men/1.jpg",
    description: "John is a skilled web developer who specializes in front-end technologies."
  },
  {
    id: "3",
    name: "Sara Davis",
    expertise: "Digital Marketing",
    picture: "https://randomuser.me/api/portraits/women/2.jpg",
    description: "Sara is an expert in digital marketing strategies and social media management."
  }
];

const MeetOurFreelancers: React.FC = () => {
  const [freelancers, setFreelancers] = useState<Freelancer[]>(dummyFreelancers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Commented out useEffect since we're using dummy data
  // useEffect(() => {
  //   const fetchFreelancers = async () => {
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       const response = await api.get("/freelancers");
  //       setFreelancers(response.data);
  //     } catch (error) {
  //       console.error(`Failed to fetch freelancers: \n${handleError(error)}`);
  //       setError("Failed to fetch freelancers. Please try again later.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchFreelancers();
  // }, []);

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
            <img src={freelancer.picture} alt={freelancer.name} className="freelancer-picture" />
            <h3>{freelancer.name}</h3>
            <p><strong>Expertise:</strong> {freelancer.expertise}</p>
            <p className="description">{freelancer.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetOurFreelancers;
