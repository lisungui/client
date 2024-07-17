import React, { useState } from "react";
import "../../styles/views/CreatePost.scss";
import CategoryList from "./CategoryList";
import { api, handleError } from "helpers/api";

const categories = [
  "Web Development",
  "Mobile Development",
  "Graphic Design",
  "Digital Marketing",
  "Writing & Translation",
  "Video & Animation",
  "Music & Audio",
  "Programming & Tech",
  "Business",
  "Lifestyle"
];

const CreatePost: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [postContent, setPostContent] = useState<string>("");

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const handleCreatePost = async () => {
    if (selectedCategory && postContent) {
      try {
        const payload = {
          category: selectedCategory,
          content: postContent
        };
        await api.post("/api/forum/posts", payload);
        alert("Post created successfully");
        setPostContent("");
        setSelectedCategory(null);
      } catch (error) {
        console.error("Error creating post:", handleError(error));
      }
    } else {
      alert("Please select a category and write some content");
    }
  };

  return (
    <div className="create-post">
      <h2>Create a New Post</h2>
      <CategoryList categories={categories} onSelectCategory={handleSelectCategory} />
      {selectedCategory && <p>Selected Category: {selectedCategory}</p>}
      <textarea
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        placeholder="Write your post here..."
      />
      <button onClick={handleCreatePost}>Create Post</button>
    </div>
  );
};

export default CreatePost;