import React, { useState } from "react";
import { auth, googleProvider, githubProvider } from "../../firebaseConfig";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import { Button } from "components/ui/Button";
import { useNavigate } from "react-router-dom";
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

const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState<string>(null);
  const [email, setEmail] = useState<string>(null);
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log(isSignUp ? "Signed up with Google" : "Signed in with Google");
      navigate("/home");
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const signInWithGithub = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      console.log(isSignUp ? "Signed up with GitHub" : "Signed in with GitHub");
      navigate("/home");
    } catch (error) {
      console.error("Error signing in with GitHub", error);
      if (error.code === "auth/account-exists-with-different-credential") {
        setError("An account already exists with the same email address but different sign-in credentials.");
        alert("An account already exists with the same email address but different sign-in credentials.");
      } else {
        setError(error.message);
      }
    }
  };

  const signInWithEmail = async () => {
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/home");
        console.log("Signed in with Email and Password");
      } catch (error) {
        console.error("Error signing in with Email and Password", error);
        console.error("Error code: ", error.code);
        if (error.code === "auth/invalid-email") {
          setError("The email address is badly formatted.");
          alert("Invalid email address. Please try a valid one.");
        } else if (error.code === "auth/user-not-found") {
          setError("There is no user record corresponding to this identifier. The user may have been deleted.");
          alert("There is no user record corresponding to this identifier. The user may have been deleted.");
        } else if (error.code === "auth/too-many-requests") {
          setError("We have blocked all requests from this device due to unusual activity. Try again later.");
          alert("We have blocked all requests from this device due to unusual activity. Try again later.");
        } else if (error.code === "auth/invalid-credential") {
          setError("The email and password combination is invalid.");
          alert("The email and password combination is invalid.");
        } else if (error.code === "auth/wrong-password") {
          setError("The password is invalid or the user does not have a password.");
          alert("The password is invalid or the user does not have a password.");
        } else {
          setError(error.message);
        }
      }
    }
  };

  const signUpWithEmail = async () => {
    if (email && password) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("Signed up with Email and Password");
        navigate("/home");
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
        <h2>Sign {isSignUp ? "Up" : "In"}</h2>
        <h4>to your Lisungui account</h4>
        <div className="register form">
          <FormField
            label="Email"
            value={email}
            onChange={(un: string) => setEmail(un)}
          />
          <FormField
            label="Password"
            value={password}
            onChange={(n: string) => setPassword(n)}
            type="password"
          />
          <div className="register button-container">
            <Button
              disabled={!email || !password}
              width="50%"
              onClick={isSignUp ? signUpWithEmail : signInWithEmail}
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </div>
          <div className="register button-container">
            <p className="register prompt">
              {isSignUp ? "Already have an account?" : "Don't have an account yet?"}{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsSignUp(!isSignUp);
                }}
              >
                {isSignUp ? "Login" : "Sign Up"}
              </a>
            </p>
          </div>
        </div>
        <p className="or-container">OR</p> {/* Use the new class for styling */}
        <div className="social-buttons">
          <Button onClick={signInWithGoogle}>
            <FontAwesomeIcon icon={faGoogle} style={{ marginRight: "10px" }} />
            {isSignUp ? "Sign Up with Google" : "Sign In with Google"}
          </Button>
          <Button onClick={signInWithGithub}>
            <FontAwesomeIcon icon={faGithub} style={{ marginRight: "10px" }} />
            {isSignUp ? "Sign Up with GitHub" : "Sign In with GitHub"}
          </Button>
        </div>
      </div>
    </BaseContainer>
  );
};

export default SignIn;


