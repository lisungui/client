import React, { useState, useEffect } from "react";
import { api, handleError } from "helpers/api";
import PortfolioItemForm from "components/views/PortfolioItemForm";
import "../../styles/views/PortfolioPage.scss";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebaseConfig";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrls: string[];
  projectLink: string;
}

const PortfolioPage: React.FC = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [portfolioId, setPortfolioId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [currentItem, setCurrentItem] = useState<PortfolioItem | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchPortfolioItems(user.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchPortfolioItems = async (freelancerId: string) => {
    try {
      const response = await api.get(`/api/portfolios/${freelancerId}`);
      setPortfolioItems(response.data.items);
      setPortfolioId(response.data.id);
    } catch (error) {
      console.error("Failed to fetch portfolio items:", handleError(error));
    }
  };

  const handleEdit = (item: PortfolioItem) => {
    setCurrentItem(item);
    setShowForm(true);
  };

  const handleDelete = async (itemId: string) => {
    try {
      await api.delete(`/api/portfolios/${portfolioId}/items/${itemId}`);
      setPortfolioItems(portfolioItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error("Failed to delete portfolio item:", handleError(error));
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setCurrentItem(null);
    if (user) {
      fetchPortfolioItems(user.uid);
    }
  };

  const handleAddPortfolioItem = () => {
    setCurrentItem(null);
    setShowForm(true);
  };

  return (
    <div className="portfolio-page">
      <h1>My Portfolio</h1>
      <button onClick={handleAddPortfolioItem} className="add-button">
        Add Portfolio Item
      </button>
      <div className="portfolio-list">
        {portfolioItems.map(item => (
          <div key={item.id} className="portfolio-item">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <div className="images">
              {item.imageUrls.map(url => (
                <img key={url} src={url} alt={item.title} />
              ))}
            </div>
            <a href={item.projectLink} target="_blank" rel="noopener noreferrer">
              View Project
            </a>
            <div className="button-container">
              <button onClick={() => handleEdit(item)} className="edit-button">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="delete-button">Delete</button>
            </div>
          </div>
        ))}
      </div>
      {showForm && user && portfolioId && (
        <PortfolioItemForm
          item={currentItem}
          onClose={handleFormClose}
          portfolioId={portfolioId}
          freelancerId={user.uid}
        />
      )}
    </div>
  );
};

export default PortfolioPage;

