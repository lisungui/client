import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api, handleError } from "helpers/api";
import "../../styles/views/FreelancerDetails.scss";
import { Freelancer } from "models/Freelancer";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrls: string[];
  projectLink: string;
}

const FreelancerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [freelancer, setFreelancer] = useState<Freelancer | null>(null);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    const fetchFreelancer = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/api/freelancers/${id}`);
        setFreelancer(response.data);
        fetchPortfolioItems(response.data.id);
      } catch (error) {
        console.error(`Failed to fetch freelancer: \n${handleError(error)}`);
        setError("Failed to fetch freelancer. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const fetchPortfolioItems = async (freelancerId: string) => {
      try {
        const response = await api.get(`/api/portfolios/${freelancerId}`);
        setPortfolioItems(response.data.items);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setPortfolioItems([]);
        }
      }
    };

    fetchFreelancer();
    
    return () => unsubscribe();
  }, [id]);

  const handleContactClick = () => {
    if (user) {
      navigate(`/messages/${user.uid}/${freelancer?.id}`);
    } else {
      navigate("/login", { state: { redirectTo: `/messages/${auth.currentUser?.uid}/${freelancer?.id}` } });
    }
  };

  const handleUpdateProfileClick = () => {
    navigate(`/freelancer/update/${freelancer?.id}`);
  };

  if (loading) {
    return <div className="loading">Loading freelancer details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!freelancer) {
    return <div className="error">Freelancer not found</div>;
  }

  const renderList = (title: string, items: string[]) => (
    items.length > 0 && (
      <div className="info-section">
        <h3>{title}:</h3>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    )
  );

  const renderExperience = () => (
    freelancer.experience.length > 0 && (
      <div className="info-section">
        <h3>Experience:</h3>
        <ul>
          {freelancer.experience.map((exp, index) => (
            <li key={index}>
              <strong>{exp.companyName}</strong> - {exp.position} ({exp.startDate} - {exp.endDate})
              <p>{exp.responsibility}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  );

  const renderReferences = () => (
    freelancer.references.length > 0 && (
      <div className="info-section">
        <h3>References:</h3>
        <ul>
          {freelancer.references.map((ref, index) => (
            <li key={index}>
              <strong>{ref.name}</strong> - {ref.position} ({ref.email})
            </li>
          ))}
        </ul>
      </div>
    )
  );

  const renderLanguages = () => (
    freelancer.languages.length > 0 && (
      <div className="info-section">
        <h3>Languages:</h3>
        <ul>
          {freelancer.languages.map((lang, index) => (
            <li key={index}>
              {lang.language} - {lang.level}
            </li>
          ))}
        </ul>
      </div>
    )
  );

  const renderPortfolioItems = () => (
    portfolioItems.length > 0 && (
      <div className="info-section portfolio">
        <h3>Portfolio:</h3>
        <ul>
          {portfolioItems.map((item) => (
            <li key={item.id}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <div className="portfolio-images">
                {item.imageUrls.map((url, index) => (
                  <img key={index} src={url} alt={item.title} />
                ))}
              </div>
              {item.projectLink && <a href={item.projectLink} target="_blank" rel="noopener noreferrer">View Project</a>}
            </li>
          ))}
        </ul>
      </div>
    )
  );

  return (
    <div className="freelancer-details-container">
      <img src={freelancer.picture} alt={freelancer.fullName} className="freelancer-picture" />
      <h2>{freelancer.fullName}</h2>
      <p><strong>Expertise:</strong> {freelancer.expertise.join(", ")}</p>
      <p>{freelancer.summary}</p>
      <div className="skills">
        <h3>Skills:</h3>
        <ul>
          {freelancer.skills.map(skill => (
            <li key={skill.skill}>
              {skill.skill} - {skill.level}
            </li>
          ))}
        </ul>
      </div>
      {renderList("Interests", freelancer.interests)}
      {renderLanguages()}
      {renderList("Certifications", freelancer.certifications)}
      {renderList("Education", freelancer.education)}
      {renderExperience()}
      {renderList("Projects", freelancer.projects)}
      {renderList("Social Links", freelancer.socialLinks)}
      {renderReferences()}
      {renderList("Awards", freelancer.awards)}
      {renderList("Publications", freelancer.publications)}
      {renderList("Patents", freelancer.patents)}
      {renderList("Courses", freelancer.courses)}
      {renderList("Organizations", freelancer.organizations)}
      {renderList("Volunteer Activities", freelancer.volunteer)}
      {renderPortfolioItems()}
      <p><strong>Rating:</strong> {freelancer.rating}</p>
      {user && user.uid === freelancer.id ? (
        <button onClick={handleUpdateProfileClick} className="update-profile-button">Update Profile</button>
      ) : (
        <button onClick={handleContactClick} className="contact-button">Contact</button>
      )}
    </div>
  );
};

export default FreelancerDetails;
