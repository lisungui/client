import React, { useEffect, useState } from "react";
import "../../styles/views/ForumPage.scss";
import { api, handleError } from "helpers/api";
import CreatePost from "./CreatePost";
import PostList from "./PostList";
import SearchBar from "./SearchBar";
import { categories } from "../shared/categories";

const ForumPage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/api/forum/posts");
        setPosts(response.data);
        console.log("All posts fetched:", response.data);
        setFilteredPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", handleError(error));
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    filterAndSearchPosts();
  }, [selectedCategory, searchQuery, posts]);

  const filterAndSearchPosts = () => {
    let tempPosts = posts;

    if (selectedCategory) {
      tempPosts = tempPosts.filter(post => post.categoryId === selectedCategory);
    }

    if (searchQuery) {
      tempPosts = tempPosts.filter(post =>
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPosts(tempPosts);
  };

  return (
    <div className="forum-page">
      <h1>Community Forum</h1>
      <SearchBar query={searchQuery} onSearch={setSearchQuery} />
      <div className="filter-section">
        <label className="filter-label">Filter By:</label>
        <select
          className="category-select"
          value={selectedCategory || ""}
          onChange={(e) => setSelectedCategory(e.target.value || null)}
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <CreatePost />
      <PostList posts={filteredPosts} setPosts={setPosts} />
    </div>
  );
};

export default ForumPage;