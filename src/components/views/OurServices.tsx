import React from "react";
import { categories } from "../shared/categories";
import "../../styles/views/OurServices.scss";

const OurServices: React.FC = () => {
  return (
    <div className="our-services">
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <a href={`/services/${category.toLowerCase().replace(/ /g, "-")}`} className="service-link">
              {category}
              {index < categories.length - 1 && <span className="separator"></span>}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OurServices;