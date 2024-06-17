import React, { useState, useEffect } from "react";
import "../../styles/views/CreateGig.scss";
import { api, handleError } from "helpers/api";
import { useNavigate } from "react-router-dom";
import { Button } from "components/ui/Button";
import { Spinner } from "components/ui/Spinner";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { categories } from "../shared/categories";

const CreateGig: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: categories[0], // Default to the first category
    price: "",
    status: "Medium", // Default status
    deadline:null,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post(`/gigs/${user.uid}`, formData);
      navigate("/my-gigs");
    } catch (error) {
      console.error(`Something went wrong while creating the gig: \n${handleError(error)}`);
      alert("An error occurred while creating the gig");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-gig-container">
      <h2>Create a New Gig</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            placeholder="Type here a title for your gig..."
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            placeholder="Type here a description for your gig..."
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="deadline">Deadline:</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            placeholder="Type here the deadline for your gig..."
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            placeholder="Type here the price for your gig..."
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="status">Status:</label>
          <select id="status" name="status" value={formData.status} onChange={handleChange} required>
            <option value="Urgent">Urgent</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? <Spinner size="small" /> : "Create Gig"}
        </Button>
      </form>
    </div>
  );
};

export default CreateGig;
