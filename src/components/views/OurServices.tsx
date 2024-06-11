// src/components/views/OurServices.tsx

import React from "react";
import "../../styles/views/OurServices.scss"; // Import the SCSS file

const OurServices: React.FC = () => {
  // Service names and their corresponding paths (routes)
  const services = [
    { name: "Graphic Design", path: "/services/graphic-design" },
    { name: "Digital Marketing", path: "/services/digital-marketing" },
    { name: "Writing and Translation", path: "/services/writing-translation" },
    { name: "Programming and Tech", path: "/services/programming-tech" },
    { name: "Data Science", path: "/services/data-science" },
    { name: "Business", path: "/services/business" },
    { name: "Consulting", path: "/services/consulting" },
    { name: "AI", path: "/services/ai" },
    { name: "Machine Learning", path: "/services/machine-learning" }
  ];

  return (
    <div className="our-services">
      <ul>
        {services.map((service, index) => (
          <li key={index}>
            <a href={service.path} className="service-link">
              {service.name}
              {index < services.length - 1 && <span className="separator"></span>}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OurServices;


