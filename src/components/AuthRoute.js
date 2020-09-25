import React from "react";

import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({ children, auth, ...otherProps }) => (
  <Route {...otherProps}>{auth ? children : <Redirect to="/" />}</Route>
);

export default AuthRoute;
