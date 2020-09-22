import React, { useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import { Typography, TextField, Button } from "@material-ui/core";

import { EMAIL_REGEXP } from "../../constants";

import Toast from "../Toast";

import "./SignupForm.scss";

const textFields = [
  { name: "email", type: "email", label: "E-mail", autoComplete: "email" },
  { name: "password", type: "password", label: "Password", autoComplete: "new-password" },
  { name: "confirm", type: "password", label: "Confirm password", autoComplete: "off" }
];

const SignupForm = ({ signupFormSubmit, clearSignupError, user }) => {
  const [formData, setFormData] = useState({ email: "", password: "", confirm: "" });
  const [formError, setFormError] = useState({ email: " ", password: " ", confirm: " " });

  const passwordInput = useRef(null);

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.getAttribute("name")]: evt.target.value });
  };

  const handleBlur = evt => {
    const [name, value] = [evt.target.name, evt.target.value];

    let error = " ";
    if (!value) {
      error = `"${name}" field is required`;
    } else {
      switch (name) {
        case "email":
          if (!EMAIL_REGEXP.test(value)) {
            error = "This e-mail address is not valid";
          }
          break;
        case "password":
          if (value.length < 6) {
            error = "Your password must be at least 6 characters long";
          }
          break;
        case "confirm":
          if (value !== passwordInput.current.value) {
            error = "Password and confirmation do not match";
          }
          break;
        default:
          return;
      }
    }

    setFormError({ ...formError, [name]: error });
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    signupFormSubmit(formData);
  };

  const handleToastClose = () => {
    clearSignupError();
  };

  return user.data ? (
    <Redirect to="/" />
  ) : (
    <div className="registration-form">
      <Typography component="h1" variant="h4">
        Sign up
      </Typography>

      <form onSubmit={handleSubmit}>
        {textFields.map(({ name, type, label, autoComplete }, i) => {
          const error = !/^\s*$/.test(formError[name]);
          const helperText = name === "password" && !error ? "6 characters min." : formError[name];
          return (
            <TextField
              key={name}
              inputRef={name === "password" ? passwordInput : null}
              type={type}
              id={name}
              name={name}
              label={label}
              error={error}
              helperText={helperText}
              autoComplete={autoComplete}
              autoFocus={i === 0}
              fullWidth
              required
              onChange={handleChange}
              onBlur={handleBlur}
              value={formData[name]}
            />
          );
        })}

        <Button variant="contained" color="primary" size="large" type="submit">
          Sign up
        </Button>
      </form>

      <Toast
        open={Boolean(user.alerts.length)}
        alerts={user.alerts}
        severity="error"
        handleClose={handleToastClose}
      />
    </div>
  );
};

export default SignupForm;
