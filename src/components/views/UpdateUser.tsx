import React, { useState, useEffect } from "react";
import "../../styles/views/UpdateUser.scss";
import { api, handleError } from "helpers/api";
import { useNavigate, useParams } from "react-router-dom";
import FormField from "./FormField";

const UpdateUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    country: "",
    birthday: "",
    languages: [] as string[],
    zipCode: "",
    address: "",
    city: "",
    interest: "",
  });

  const availableLanguages = [
    "English", "Spanish", "French", "German", "Chinese", "Japanese", 
    "Russian", "Portuguese", "Arabic", "Italian", "Korean", "Dutch"
  ];

  useEffect(() => {
    // Fetch user data to populate the form if needed
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/users/${id}`);
        setFormData({
          username: response.data.username || "",
          phoneNumber: response.data.phone || "",
          country: response.data.country || "",
          birthday: response.data.birthday || "",
          languages: response.data.languages || [],
          zipCode: response.data.zipCode || "",
          address: response.data.address || "",
          city: response.data.city || "",
          interest: response.data.interests || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", handleError(error));
      }
    };

    fetchUserData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleLanguageSelect = (language: string) => {
    setFormData((prevFormData) => {
      const isSelected = prevFormData.languages.includes(language);
      const newLanguages = isSelected
        ? prevFormData.languages.filter((lang) => lang !== language)
        : [...prevFormData.languages, language];

      return { ...prevFormData, languages: newLanguages };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.put(`/users/${id}`, formData);
      // Redirect or show success message
      navigate(`/profile/${id}`)
    } catch (error) {
      console.error("Error updating user information:", handleError(error));
    }
  };

  return (
    <div className="update-user-container">
      <h2>Update Your Profile Information</h2>
      <form onSubmit={handleSubmit}>
        <FormField
          label="Username:"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <FormField
          label="Phone Number:"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <FormField
          label="Country:"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
        <FormField
          label="Birthday:"
          type="date"
          name="birthday"
          value={formData.birthday}
          onChange={handleChange}
        />
        <div className="form-field">
          <label>Languages:</label>
          <div className="languages-list">
            {availableLanguages.map((language) => (
              <div key={language} className="language-item">
                <input
                  type="checkbox"
                  id={`language-${language}`}
                  checked={formData.languages.includes(language)}
                  onChange={() => handleLanguageSelect(language)}
                />
                <label htmlFor={`language-${language}`}>{language}</label>
              </div>
            ))}
          </div>
        </div>
        <FormField
          label="ZIP Code:"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
        />
        <FormField
          label="Address:"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        <FormField
          label="City:"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
        <FormField
          label="Interest:"
          name="interest"
          value={formData.interest}
          onChange={handleChange}
        />
        <button type="submit" className="update-button">Update Information</button>
      </form>
    </div>
  );
};

export default UpdateUser;