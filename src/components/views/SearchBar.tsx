import React from "react";
import "../../styles/views/SearchBar.scss";

interface SearchBarProps {
  query: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, onSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search posts..."
      />
    </div>
  );
};

export default SearchBar;