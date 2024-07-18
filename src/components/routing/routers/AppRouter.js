import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../../views/AuthState";
import RequiredAuth from "../../views/RequiredAuth";
import Login from "../../views/Login";
import Register from "../../views/Register";
import Home from "../../views/Home";
import Header from "../../views/Header";
import SignIn from "../../views/SignIn";
import Freelancer from "../../views/Freelancer";
import ViewFreelancer from "../../views/ViewFreelance";
import Contact from "../../views/Contact";
import HomePage from "../../views/HomePage";
import Dashboard from "../../views/Dashboard";
import Faqs from "../../views/Faqs";
import About from "../../views/About";
import NotFound from "../../views/NotFound";
import Messages from "../../views/Messages";
import UpdateUser from "../../views/UpdateUser";
import UserProfile from "../../views/UserProfile";
import UserDetails from "../../views/User";
import HelpCenter from "../../views/HelpCenter";
import TermsOfService from "../../views/TermsOfService";
import PrivacyPolicy from "../../views/PrivacyPolicy";
import CreateGig from "../../views/CreateGig";
import ViewGigs from "../../views/ViewGigs";
import ServiceRouter from "./ServiceRouter";
import UpdateGig from "../../views/UpdateGig";
import Freelancing from "../../views/Freelancing";
import CreateFreelancerProfile from "../../views/CreateFreelancerProfile";
import CreatePost from "../../views/CreatePost";
import ForumPage from "../../views/ForumPage";
import PortfolioPage from "../../views/PortfolioPage";
import PortfolioIntroduction from "../../views/PortfolioIntroduction";
import FreelancerDetails from "../../views/FreelancerDetails";

const AppRouter = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header height="100" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services/*" element={<ServiceRouter />} />
          <Route path="/forum/create-post" element={<CreatePost />} />
          <Route path="/forum" element={<ForumPage />} />

          <Route
            path="/"
            element={
              <HomePage />
            }
          />

          <Route 
            path="*" 
            element={<NotFound />} 
          />

          <Route
            path="/freelancers/:id/details"
            element={
              <FreelancerDetails />
            }
          />

          <Route
            path="/messages"
            element={
              <RequiredAuth>
                <Messages />
              </RequiredAuth>
            }
          />

          <Route
            path="/portfolio/introduction"
            element={
              <RequiredAuth>
                <PortfolioIntroduction />
              </RequiredAuth>
            }
          />

          <Route
            path="/portfolio"
            element={
              <RequiredAuth>
                <PortfolioPage />
              </RequiredAuth>
            }
          />

          <Route
            path="/messages/:userId/:selectedUserId"
            element={
              <RequiredAuth>
                <Messages />
              </RequiredAuth>
            }
          />

          <Route
            path="/my-gigs/updategig/:userId/:gigId"
            element={
              <RequiredAuth>
                <UpdateGig />
              </RequiredAuth>
            }
          />

          <Route
            path="/become-freelancer"
            element={
              <RequiredAuth>
                <Freelancing />
              </RequiredAuth>
            }
          />

          <Route
            path="/user/:id/create-gig"
            element={
              <RequiredAuth>
                <CreateGig />
              </RequiredAuth>
            }
          />

          <Route
            path="my-gigs"
            element={
              <ViewGigs />
            }
          />

          <Route
            path="/helpcenter"
            element={
              <HelpCenter />
            }
          />

          <Route
            path="/update/:id"
            element={
              <RequiredAuth>
                <UpdateUser />
              </RequiredAuth>
            }
          />

          <Route 
            path="/user/:id" 
            element={
              <RequiredAuth>
                <UserDetails />
              </RequiredAuth>
            } 
          />

          <Route
            path="/profile/:id"
            element={
              <RequiredAuth>
                <UserProfile />
              </RequiredAuth>
            }
          />

          <Route
            path="/faqs"
            element={
              <Faqs />
            }
          />

          <Route
            path="/terms"
            element={
              <TermsOfService />
            }
          />

          <Route
            path="/privacy"
            element={
              <PrivacyPolicy />
            }
          />

          <Route
            path="/about"
            element={
              <About />
            }
          />

          <Route
            path="/dashboard"
            element={
              <RequiredAuth>
                <Dashboard />
              </RequiredAuth>
            }
          />

          <Route
            path="/home"
            element={
              <RequiredAuth>
                <Home />
              </RequiredAuth>
            }
          />
          <Route
            path="/freelancer"
            element={
              <RequiredAuth>
                <Freelancer />
              </RequiredAuth>
            }
          />
          <Route
            path="/freelancers/create"
            element={
              <RequiredAuth>
                <CreateFreelancerProfile />
              </RequiredAuth>
            }
          />
          <Route
            path="/freelancers/:id"
            element={
              <RequiredAuth>
                <ViewFreelancer />
              </RequiredAuth>
            }
          />
          {/* <Route path="/user/*" element={<GameRouter />} /> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default AppRouter;
