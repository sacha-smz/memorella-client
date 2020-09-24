import { createSelector } from "reselect";

const getUser = state => state.user;

export const getUserWithAlerts = form =>
  createSelector(getUser, user => {
    const error = user[form + "Error"];
    if (!error) return { ...user, alerts: [] };

    return { ...user, alerts: error.errors.map(err => err.msg) };
  });
