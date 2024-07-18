import React, { useState } from "react";
import { api, handleError } from "helpers/api";
import "../../styles/views/PortfolioItemForm.scss";

interface PortfolioItem {
  id?: string;
  title: string;
  description: string;
  imageUrls: string[];
  projectLink: string;
}

interface Props {
  item: PortfolioItem | null;
  onClose: () => void;
  portfolioId: string;
}

const PortfolioItemForm: React.FC<Props> = ({ item, onClose, portfolioId }) => {
  const [formData, setFormData] = useState<PortfolioItem>({
    title: item?.title || "",
    description: item?.description || "",
    imageUrls: item?.imageUrls || [],
    projectLink: item?.projectLink || ""
  });
  const [images, setImages] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const base64Images = await Promise.all(files.map(file => toBase64(file)));
      setImages([...images, ...files]);
      setFormData({ ...formData, imageUrls: [...formData.imageUrls, ...base64Images] });
    }
  };

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (item) {
        await api.put(`/api/portfolios/${portfolioId}/items/${item.id}`, formData);
      } else {
        const itemResponse = await api.post(`/api/portfolios/${portfolioId}/items`, formData);
      }
      onClose();
    } catch (error) {
      console.error("Failed to save portfolio item:", handleError(error));
      alert("Failed to save portfolio item. Please try again.");
    }
  };

  return (
    <div className="portfolio-item-form">
      <h2>{item ? "Edit Portfolio Item" : "Add Portfolio Item"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="projectLink">Project Link</label>
          <input
            type="url"
            id="projectLink"
            name="projectLink"
            value={formData.projectLink}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="images">Images</label>
          <input type="file" id="images" onChange={handleImageChange} multiple />
        </div>
        <button type="submit" className="save-button">Save</button>
        <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
      </form>
    </div>
  );
};

export default PortfolioItemForm;


