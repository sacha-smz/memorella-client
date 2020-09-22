import { createSelector } from "reselect";

const getUser = state => state.user;

export const getUserWithAlerts = createSelector(getUser, user => {
  const error = user.signupError;
  if (!error) return { ...user, alerts: [] };

  if (error.errors) {
    return { ...user, alerts: error.errors.map(err => err.msg) };
  } else {
    return { ...user, alerts: [error.toString()] };
  }
});
