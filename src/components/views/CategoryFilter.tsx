import React from "react";
import "../../styles/views/CategoryFilter.scss";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-filter">
      {categories.map((category, index) => (
        <button
          key={index}
          className={`category-item ${selectedCategory === category ? "selected" : ""}`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;