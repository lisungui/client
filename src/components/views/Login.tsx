import React, { useState } from "react";
import { auth, googleProvider, githubProvider } from "../../firebaseConfig";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import BaseContainer from "components/ui/BaseContainer";
import { Button } from "components/ui/Button";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons"; // Import the icons
import "styles/views/SignIn.scss"; // Import the updated SCSS file

const FormField = (props) => {
  return (
    <div className="register field">
      <label className="register label">{props.label}</label>
      <input
        type={props?.type || "text"}
        className="register input"
        placeholder="enter here.."
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
};

const Login = () => {
  const [email, setEmail] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || "/home";

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate(redirectTo);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const signInWithGithub = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      navigate(redirectTo);
    } catch (error) {
      console.error("Error signing in with GitHub", error);
      setError(error.message);
    }
  };

  const signInWithEmail = async () => {
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate(redirectTo);
      } catch (error) {
        console.error("Error signing in with Email and Password", error);
        setError(error.message);
      }
    }
  };

  return (
    <BaseContainer>
      <div className="register container">
        <h2>Sign In</h2>
        <h4>to your Lisungui account</h4>
        <div className="register form">
          <FormField label="Email" value={email} onChange={setEmail} />
          <FormField
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
          />
          <div className="register button-container">
            <Button
              disabled={!email || !password}
              width="50%"
              onClick={signInWithEmail}
            >
              Sign In
            </Button>
          </div>
          <div className="register button-container">
            <p className="register prompt">
            Don&apos;t have an account yet?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/register", { state: { redirectTo } });
                }}
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
        <p className="or-container">OR</p> {/* Use the new class for styling */}
        <div className="social-buttons">
          <Button onClick={signInWithGoogle}>
            <FontAwesomeIcon icon={faGoogle} style={{ marginRight: "10px" }} />
            Sign In with Google
          </Button>
          <Button onClick={signInWithGithub}>
            <FontAwesomeIcon icon={faGithub} style={{ marginRight: "10px" }} />
            Sign In with GitHub
          </Button>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Login;
