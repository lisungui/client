import React, { useEffect, useState } from "react";
import "../../styles/views/ForumPage.scss";
import { api, handleError } from "helpers/api";
import CreatePost from "./CreatePost";
import PostList from "./PostList";
import CategoryFilter from "./CategoryFilter";
import SearchBar from "./SearchBar";

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
      tempPosts = tempPosts.filter(post => post.category === selectedCategory);
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
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <CreatePost />
      <PostList posts={filteredPosts} />
    </div>
  );
};

export default ForumPage;