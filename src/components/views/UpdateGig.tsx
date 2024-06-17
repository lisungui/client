import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api, handleError } from "helpers/api";
import { Button } from "components/ui/Button";
import { Spinner } from "components/ui/Spinner";
import "../../styles/views/UpdateGig.scss";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";

interface Gig {
  title: string;
  category: string;
  description: string;
  price: number;
  status: string;
  duration: string;
  deadline: string | null; // Make sure deadline is nullable
  updatedDate: null;
  updatedDeadline: null;
}

const UpdateGig: React.FC = () => {
  const [formData, setFormData] = useState<Gig>({
    title: "",
    category: "",
    description: "",
    price: 0,
    deadline: null,
    status: "Medium", // Default status
    duration: "",
    updatedDate: null,
    updatedDeadline: null,
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { userId, gigId } = useParams<{ userId: string, gigId: string }>();

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

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const response = await api.get(`/gigs/${userId}/${gigId}`);
        const gigData = response.data;

        // Convert the deadline to yyyy-MM-dd format
        if (gigData.deadline) {
          gigData.deadline = gigData.deadline.split("T")[0];
        }

        setFormData(gigData);
        setLoading(false);
      } catch (error) {
        console.error(`Failed to fetch gig: \n${handleError(error)}`);
        setLoading(false);
      }
    };

    if (userId && gigId) {
      fetchGig();
    }
  }, [userId, gigId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await api.put(`/gigs/updategig/${userId}/${gigId}`, formData);
      navigate("/my-gigs");
    } catch (error) {
      console.error(`Failed to update gig: \n${handleError(error)}`);
      alert("An error occurred while updating the gig.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="update-gig-container">
      <h1>Update Your Gig</h1>
      <h2>Modify the details of your gig below:</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
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
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="category">Category:</label>
          <select id="category" name="category" value={formData.category} onChange={handleChange} required>
            <option value="Graphic Design">Graphic Design</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Writing and Translation">Writing and Translation</option>
            <option value="Programming and Tech">Programming and Tech</option>
            <option value="Data Science">Data Science</option>
            <option value="Business">Business</option>
            <option value="Consulting">Consulting</option>
            <option value="AI">AI</option>
            <option value="Machine Learning">Machine Learning</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="deadline">Deadline:</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline || ""}
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
        <Button type="submit" disabled={updating}>
          {updating ? <Spinner size="small" /> : "Update Gig"}
        </Button>
      </form>
    </div>
  );
};

export default UpdateGig;