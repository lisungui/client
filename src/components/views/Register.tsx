import React, { useState } from "react";
import { api, handleError } from "helpers/api";
import User from "models/User";
import { useNavigate } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Register.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
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
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>(null);
  const [email, setEmail] = useState<string>(null);

  const doRegister = async () => {
    try {
      const requestBody = JSON.stringify({ email, password });
      const response = await api.post("/users/register", requestBody);

      // Get the returned user and update a new object.
      const user = new User(response.data);
      // Store the userToken into the local storage.
      console.log(user.userToken);
      localStorage.setItem("userToken", user.userToken);
      localStorage.setItem("id", user.id);
      localStorage.setItem("username", user.username);
      console.log(user.username);

      navigate("/home");
    } catch (error) {
      console.error(
        `Something went wrong while joining the lobby: \n${handleError(error)}`
      );
      console.error("Details:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "An unknown error occurred";
      alert(
        `${errorMessage}`
      );
    }
  };

  return (
    <BaseContainer>
      <div className="register container">
        <h2>Sign Up</h2>
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
              onClick={() => doRegister()}
            >
              Sign Up
            </Button>
          </div>
          <div className="register button-container">
            <p className="register prompt">
              Already have an account? <a href="/login" onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}>Login</a>
            </p>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the useLocation, useNavigate, useParams, ... hooks.
 */
export default Register;
