import React from "react";
import DashboardIntroduction from "./DashboardIntroduction";
import FeatureUpdates from "./FeatureUpdates";
import "../../styles/views/Dashboard.scss";
import DashboardOverview from "./DashboardOverview";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <DashboardOverview />
      <DashboardIntroduction />
    </div>
  );
};

export default Dashboard;
