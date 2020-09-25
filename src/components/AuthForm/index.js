import React, { useState } from "react";
import { Typography, TextField, Button } from "@material-ui/core";

import Toast from "../Toast";

import "./AuthForm.scss";

const notEmpty = errObj => Object.values(errObj).some(error => error !== " ");

const AuthForm = ({ fields, formSubmit, clearError, user, title, submitText, modifier }) => {
  const [initData, initError] = fields.reduce(
    (acc, field) => {
      acc[0][field.name] = "";
      acc[1][field.name] = " ";
      return acc;
    },
    [{}, {}]
  );

  const [formData, setFormData] = useState(initData);
  const [formError, setFormError] = useState(initError);

  const handleSubmit = evt => {
    if (notEmpty(formError)) return;

    evt.preventDefault();
    formSubmit(formData);
  };

  return (
    <div className={"page-container auth-form auth-form--" + modifier}>
      <Typography component="h1" variant="h4">
        {title}
      </Typography>

      <form onSubmit={handleSubmit} className="auth-form">
        {fields.map(({ name, type, label, autoComplete, required, error, ref }, i) => {
          const helperText = formError[name];

          const handleChange = evt => {
            const val = evt.target.value;
            if (
              helperText !== " " &&
              ((!val && !required) || (val && (!error || !error.test(val))))
            ) {
              setFormError({ ...formError, [name]: " " });
            }
            setFormData({ ...formData, [name]: val });
          };

          const handleBlur = () => {
            let errMsg = " ";
            if (required && !formData[name]) {
              errMsg = `"${name}" field is required`;
            } else if (error && error.test(formData[name])) {
              errMsg = error.msg;
            }
            setFormError({ ...formError, [name]: errMsg });
          };

          return (
            <TextField
              key={name}
              id={name}
              value={formData[name]}
              autoFocus={i === 0}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              error={helperText !== " "}
              inputRef={ref}
              {...{ helperText, name, type, label, autoComplete, required }}
            />
          );
        })}

        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          disabled={notEmpty(formError)}
        >
          {submitText}
        </Button>
      </form>

      <Toast
        open={Boolean(user.alerts.length)}
        alerts={user.alerts}
        severity="error"
        handleClose={clearError}
      />
    </div>
  );
};

export default AuthForm;
