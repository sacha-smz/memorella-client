import http from "../../utils/http";

import {
  signupSuccess,
  signupError,
  signinSuccess,
  signinError,
  SIGNUP_FORM_SUBMIT,
  SIGNIN_FORM_SUBMIT,
  LOGOUT
} from "../actions/user";

export default _ => next => async action => {
  switch (action.type) {
    case SIGNUP_FORM_SUBMIT:
      try {
        const response = await http.post("/users", { data: action.payload });
        next(signupSuccess(response.data));
      } catch (err) {
        next(signupError(err));
      }
      break;
    case SIGNIN_FORM_SUBMIT:
      try {
        const response = await http.post("/auth/login", { data: action.payload });
        const { accessToken: access, refreshToken: refresh, ...data } = response.data;
        next(signinSuccess({ access, refresh, data }));
      } catch (err) {
        next(signinError(err));
      }
      break;
    case LOGOUT:
      try {
        const token = action.payload && action.payload.token;
        await http.post("/auth/logout", { token });
      } catch (err) {
        console.error(err);
      } finally {
        next(action);
      }
      break;
    default:
      next(action);
  }
};
