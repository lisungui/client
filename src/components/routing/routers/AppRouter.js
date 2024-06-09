import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../../views/AuthState";
import RequiredAuth from "../../views/RequiredAuth";
import Login from "../../views/Login";
import Register from "../../views/Register";
import Home from "../../views/Home";
import LobbyCreate from "../../views/LobbyCreate";
import LobbyHost from "../../views/LobbyHost";
import LobbyJoin from "../../views/LobbyJoin";
import LobbyJoined from "../../views/LobbyJoined";
import GameCreate from "../../views/GameCreate";
import GameGuess from "../../views/GameGuess";
import Scoreboard from "../../views/Scoreboard";
import Header from "../../views/Header";
import SignIn from "../../views/SignIn";
import GameRouter from "./GameRouter";
import Freelancer from "../../views/Freelancer";
import ViewFreelancer from "../../views/ViewFreelance";
import Contact from "../../views/Contact";
import HomePage from "../../views/HomePage";
import Dashboard from "../../views/Dashboard";
import Faqs from "../../views/Faqs";
import About from "../../views/About";
import NotFound from "../../views/NotFound";

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
            path="/faqs"
            element={
              <Faqs />
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
            path="/lobby/create"
            element={
              <RequiredAuth>
                <LobbyCreate />
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
          <Route
            path="/lobby/join"
            element={
              <RequiredAuth>
                <LobbyJoin />
              </RequiredAuth>
            }
          />
          <Route
            path="/lobby/joined/:id"
            element={
              <RequiredAuth>
                <LobbyJoined />
              </RequiredAuth>
            }
          />
          <Route
            path="/lobby/host/:id"
            element={
              <RequiredAuth>
                <LobbyHost />
              </RequiredAuth>
            }
          />
          <Route
            path="/game/create/:id"
            element={
              <RequiredAuth>
                <GameCreate />
              </RequiredAuth>
            }
          />
          <Route
            path="/game/guess/:id"
            element={
              <RequiredAuth>
                <GameGuess />
              </RequiredAuth>
            }
          />
          <Route
            path="/game/scoreboard/:id"
            element={
              <RequiredAuth>
                <Scoreboard />
              </RequiredAuth>
            }
          />
          <Route path="/user/*" element={<GameRouter />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default AppRouter;
