import React from "react";

import { Route, Redirect } from "react-router-dom";

const AdminRoute = ({ children, auth, user, ...otherProps }) => (
  <Route {...otherProps}>
    {auth && user.data && user.data.is_admin ? children : <Redirect to="/" />}
  </Route>
);

export default AdminRoute;
