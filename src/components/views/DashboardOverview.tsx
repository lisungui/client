import React from "react";
import "../../styles/views/DashboardOverview.scss";

const DashboardOverview: React.FC = () => {
  return (
    <div className="dashboard-overview">
      <div className="summary-widgets">
        <div className="widget">
          <h3>Active Gigs</h3>
          <p>5</p> {/* Placeholder for dynamic data */}
        </div>
        <div className="widget">
          <h3>Upcoming Deadlines</h3>
          <ul>
            <li>Project A - 2 days left</li>
            <li>Project B - 5 days left</li>
          </ul>
        </div>
        <div className="widget">
          <h3>New Messages</h3>
          <p>3</p> {/* Placeholder for dynamic data */}
        </div>
        <div className="widget">
          <h3>Notifications</h3>
          <ul>
            <li>New gig request</li>
            <li>Payment received</li>
          </ul>
        </div>
      </div>
      <div className="activity-feed">
        <h3>Recent Activities</h3>
        <ul>
          <li>New message from Client A</li>
          <li>Gig &quot;Web Design&quot; posted</li>
          <li>Payment received for &quot;SEO Analysis&quot;</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardOverview;
