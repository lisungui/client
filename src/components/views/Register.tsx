import React, { useState } from "react";
import { auth, googleProvider, githubProvider } from "../../firebaseConfig";
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import BaseContainer from "components/ui/BaseContainer";
import { Button } from "components/ui/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons"; // Import the icons
import "styles/views/SignIn.scss"; // Import the updated SCSS file
import PropTypes from "prop-types";


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

const Register = () => {
  const [email, setEmail] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || "/home";

  const signUpWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate(redirectTo);
    } catch (error) {
      console.error("Error signing up with Google", error);
    }
  };

  const signUpWithGithub = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      navigate(redirectTo);
    } catch (error) {
      console.error("Error signing up with GitHub", error);
      setError(error.message);
    }
  };

  const signUpWithEmail = async () => {
    if (email && password) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("Signed up with Email and Password");
        navigate(redirectTo);
      } catch (error) {
        console.error("Error signing up with Email and Password...", error);
        if (error.code === "auth/invalid-email") {
          setError("The email address is badly formatted.");
          alert("Invalid email address. Please try a valid one.");
        } else if (error.code === "auth/weak-password") {
          setError("The password is too weak.");
          alert("The password is too weak. Please try a stronger one.");
        } else if (error.code === "auth/email-already-in-use") {
          setError("The email address is already in use by another account.");
          alert("The email address is already in use by another account.");
        }
        else {
          setError(error.message);
        }
      }
    }
  };

  return (
    <BaseContainer>
      <div className="register container">
        <h2>Sign Up</h2>
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
              onClick={signUpWithEmail}
            >
              Sign Up
            </Button>
          </div>
          <div className="register button-container">
            <p className="register prompt">
              Already have an account?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login", { state: { redirectTo } });
                }}
              >
                Login
              </a>
            </p>
          </div>
        </div>
        <p className="or-container">OR</p> {/* Use the new class for styling */}
        <div className="social-buttons">
          <Button onClick={signUpWithGoogle}>
            <FontAwesomeIcon icon={faGoogle} style={{ marginRight: "10px" }} />
            Sign Up with Google
          </Button>
          <Button onClick={signUpWithGithub}>
            <FontAwesomeIcon icon={faGithub} style={{ marginRight: "10px" }} />
            Sign Up with GitHub
          </Button>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Register;
