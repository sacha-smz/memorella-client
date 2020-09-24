import React from "react";
import { Redirect } from "react-router-dom";

import { EMAIL_REGEXP } from "../../constants";

import AuthForm from "../AuthForm";

const SignupForm = ({ signinFormSubmit, clearSigninError, user, auth }) => {
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
      autoComplete: "current-password",
      required: true
    }
  ];

  return auth ? (
    <Redirect to="/" />
  ) : (
    <AuthForm
      fields={fields}
      formSubmit={signinFormSubmit}
      clearError={clearSigninError}
      user={user}
      title="Sign In"
      submitText="Sign In"
      modifier="signin"
    />
  );
};

export default SignupForm;
