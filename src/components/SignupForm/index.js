import React, { useRef } from "react";
import { Redirect } from "react-router-dom";

import { EMAIL_REGEXP } from "../../constants";

import AuthForm from "../AuthForm";

const SignupForm = ({ signupFormSubmit, clearSignupError, user }) => {
  const passwordInput = useRef(null);

  const fields = [
    {
      name: "email",
      type: "email",
      label: "E-mail",
      autoComplete: "email",
      required: true,
      error: { test: val => !EMAIL_REGEXP.test(val), msg: "This e-mail address is not valid" }
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      autoComplete: "new-password",
      required: true,
      error: {
        test: val => val.length < 6,
        msg: "Your password must be at least 6 characters long"
      },
      ref: passwordInput
    },
    {
      name: "confirm",
      type: "password",
      label: "Confirm password",
      autoComplete: "off",
      required: true,
      error: {
        test: val => val !== passwordInput.current.value,
        msg: "Password and confirmation do not match"
      }
    }
  ];

  return user.data ? (
    <Redirect to="/signin" />
  ) : (
    <AuthForm
      fields={fields}
      formSubmit={signupFormSubmit}
      clearError={clearSignupError}
      user={user}
      title="Sign Up"
      submitText="Sign up"
      modifier="signup"
    />
  );
};

export default SignupForm;
