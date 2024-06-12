import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import "../../styles/views/DashboardOverview.scss";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import FadeLoader from "react-spinners/FadeLoader";

interface Gig {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  status: string;
  duration: string;
  createdDate: string;
}

const DashboardOverview: React.FC = () => {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [uid, setUid] = useState<string>(""); 
  const [numActiveGigs, setNumActiveGigs] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUid(user.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchGigs = async () => {
        try {
          const response = await api.get(`/listgigs/${user.uid}`);
          const fetchedGigs: Gig[] = response.data;
          setGigs(fetchedGigs);

          // Count the number of active gigs
          const activeGigsCount = fetchedGigs.filter(gig => gig.status.toLowerCase() === "urgent").length;
          setNumActiveGigs(activeGigsCount);

          setLoading(false);
        } catch (error) {
          console.error(`Failed to fetch gigs: \n${handleError(error)}`);
          setLoading(false);
        }
      };

      fetchGigs();
    }
  }, [user]);

  if (loading) {
    return <div><FadeLoader color="#36d7b7" /></div>;
  }

  return (
    <div className="dashboard-overview">
      <div className="summary-widgets">
        <div className="widget">
          <h3>Active Gigs</h3>
          <p>{numActiveGigs}</p> {/* Dynamically displaying the number of active gigs */}
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
