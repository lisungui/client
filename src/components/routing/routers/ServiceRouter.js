import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DigitalMarketing from "../../services/DigitalMarketing";
import GrapicDesign from "../../services/GraphicDesign";
import AI from "../../services/AI";
import WritingTranslation from "../../services/WritingTranslation";
import ProgrammingTech from "../../services/ProgrammingTech";
import DataScience from "../../services/DataScience";
import Business from "../../services/Business";
import Consulting from "../../services/Consulting";
import MachineLearning from "../../services/MachineLearning";
import PropTypes from "prop-types";

const ServiceRouter = ({ base }) => {
  return (
    <Routes>
      <Route path="/digital-marketing" element={<DigitalMarketing />} />
      <Route path="/graphic-design" element={<GrapicDesign />} />
      <Route path="/ai" element={<AI />} />
      <Route path="/writing-and-translation" element={<WritingTranslation />} />
      <Route path="/programming-and-tech" element={<ProgrammingTech />} />
      <Route path="/data-science" element={<DataScience />} />
      <Route path="/business" element={<Business />} />
      <Route path="/consulting" element={<Consulting />} />
      <Route path="/machine-learning" element={<MachineLearning />} />
      <Route path="*" element={<Navigate to="/digital-marketing" />} />
    </Routes>
  );
};

ServiceRouter.propTypes = {
  base: PropTypes.string,
};

export default ServiceRouter;