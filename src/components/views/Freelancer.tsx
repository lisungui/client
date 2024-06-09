import React, { useState, useEffect, useCallback } from "react";
import Freelance from "models/Freelance";
import { useNavigate } from "react-router-dom";
import { Button } from "components/ui/Button";
import { api, handleError } from "helpers/api";
import "styles/views/Freelance.scss";
import BaseContainer from "components/ui/BaseContainer";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import FormField from "../views/FormField";

const FreelanceCreate = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    skills: [],
    languages: [],
    courses: [],
    city: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUserData(user.uid);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (uid) => {
    try {
      const response = await api.get(`/users/details/${uid}`);
      const userData = response.data;
      setFormData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        skills: userData.skills || [],
        languages: userData.languages || [],
        courses: userData.courses || [],
        city: userData.city || "",
        phone: userData.phone || "",
      });
    } catch (error) {
      console.error(
        `Something went wrong while fetching the user data: \n${handleError(error)}`
      );
      console.error("Details:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "An unknown error occurred";
      alert(`${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const createFreelance = async () => {
    try {
      const response = await api.put(`/users/freelance/${user.uid}`, formData);

      const freelance = new Freelance(response.data);
      console.log("Created freelance profile:", freelance);
      console.log("Freelance ID:", freelance.id);

      navigate(`/freelancers/${freelance.id}`);
    } catch (error) {
      console.error(
        `Something went wrong while creating the freelance profile: \n${handleError(error)}`
      );
      console.error("Details:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "An unknown error occurred";
      alert(`${errorMessage}`);
    }
  };

  const handleChange = useCallback((e) => {
    const { name, value, checked, type } = e.target;

    if (type === "checkbox") {
      setFormData((prevFormData) => {
        const updatedArray = checked
          ? [...prevFormData[name], value]
          : prevFormData[name].filter((item) => item !== value);

        return {
          ...prevFormData,
          [name]: updatedArray,
        };
      });
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  return (
    <BaseContainer>
      <div className="join container">
        <div className="join form">
          <FormField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <FormField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <FormField
            label="Skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            options={["React", "Node", "Python", "Java", "C++"]}
            isCheckbox={true}
          />
          <FormField
            label="Languages"
            name="languages"
            value={formData.languages}
            onChange={handleChange}
            options={["English", "Spanish", "French", "German", "Chinese"]}
            isCheckbox={true}
          />
          <FormField
            label="Courses"
            name="courses"
            value={formData.courses}
            onChange={handleChange}
            options={["Web Development", "Data Science", "Machine Learning"]}
            isCheckbox={true}
          />
          <FormField
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          <FormField
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <div className="join button-container">
            <Button width="40%" onClick={createFreelance}>
              Update Freelance Profile
            </Button>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

export default FreelanceCreate;


