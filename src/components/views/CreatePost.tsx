import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/views/CreatePost.scss";
import { api, handleError } from "helpers/api";
import { categories } from "../shared/categories";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [postContent, setPostContent] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [isCreatingPost, setIsCreatingPost] = useState<boolean>(false); // New state for toggling form
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const handleCreatePost = async () => {
    if (!user) {
      navigate("/login", { state: { redirectTo: "/forum" } });

      return;
    }

    if (title && selectedCategory && postContent) {
      try {
        const payload = {
          title,
          categoryId: selectedCategory,
          userId: user.uid,
          content: postContent,
          commentIds: [],
          upVoteIds: [],
          downVoteIds: [],
          timestamp: new Date().toISOString(),
        };
        await api.post("/api/forum/posts", payload);
        alert("Post created successfully");
        setTitle("");
        setPostContent("");
        setSelectedCategory(null);
        setIsCreatingPost(false);
      } catch (error) {
        console.error("Error creating post:", handleError(error));
      }
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleCancel = () => {
    setTitle("");
    setSelectedCategory(null);
    setPostContent("");
    setIsCreatingPost(false);
  };

  return (
    <div className="create-post-container">
      {isCreatingPost ? (
        <div className="create-post">
          <h2>Create a New Post</h2>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <select
            value={selectedCategory || ""}
            onChange={(e) => handleSelectCategory(e.target.value)}
            required
          >
            <option value="" disabled>Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          {selectedCategory && <p className="selected-category">Selected Category: {selectedCategory}</p>}
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Write your post here..."
            required
          />
          <button onClick={handleCreatePost}>Post</button>
          <button onClick={handleCancel} className="cancel-button">Cancel</button>
        </div>
      ) : (
        <button onClick={() => setIsCreatingPost(true)}>Create Post</button>
      )}
    </div>
  );
};

export default CreatePost;
