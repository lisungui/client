import React from "react";
import "../../styles/views/CategoryList.scss";

interface CategoryListProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onSelectCategory }) => {
  return (
    <div className="category-list">
      {categories.map((category, index) => (
        <button key={index} onClick={() => onSelectCategory(category)} className="category-item">
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryList;