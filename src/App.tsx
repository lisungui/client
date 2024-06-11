import React from "react";
import AppRouter from "./components/routing/routers/AppRouter";
import Footer from "./components/views/Footer";
import "./App.scss"; // Import the SCSS file
import OurServices from "components/views/OurServices";
const App = () => {
  return (
    <div className="app-container">
      <OurServices />
      <div className="content-container">
        <AppRouter />
      </div>
      <Footer />
    </div>
  );
};

export default App;
