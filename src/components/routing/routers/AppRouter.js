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
            path="/messages"
            element={
              <RequiredAuth>
                <Messages />
              </RequiredAuth>
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
            path="/freelancers"
            element={
              <RequiredAuth>
                <Freelancer />
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
