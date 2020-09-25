import { authAction } from "./auth";
import http from "../../utils/http";

export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
const signupSuccess = payload => ({ type: SIGNUP_SUCCESS, payload });

export const SIGNUP_ERROR = "SIGNUP_ERROR";
const signupError = payload => ({ type: SIGNUP_ERROR, payload });

export const signupFormSubmit = payload => async dispatch => {
  try {
    const response = await http.post("/users", { data: payload });
    dispatch(signupSuccess(response.data));
  } catch (err) {
    dispatch(signupError(err));
  }
};

export const CLEAR_SIGNUP_ERROR = "CLEAR_SIGNUP_ERROR";
export const clearSignupError = () => ({ type: CLEAR_SIGNUP_ERROR });

export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
const signinSuccess = payload => ({ type: SIGNIN_SUCCESS, payload });

export const SIGNIN_ERROR = "SIGNIN_ERROR";
const signinError = payload => ({ type: SIGNIN_ERROR, payload });

export const signinFormSubmit = payload => async dispatch => {
  try {
    const response = await http.post("/auth/login", { data: payload });
    const { accessToken: access, refreshToken: refresh, ...data } = response.data;
    dispatch(signinSuccess({ access, refresh, data }));
  } catch (err) {
    dispatch(signinError(err));
  }
};

export const CLEAR_SIGNIN_ERROR = "CLEAR_SIGNIN_ERROR";
export const clearSigninError = () => ({ type: CLEAR_SIGNIN_ERROR });

export const CLEAR_USER_DATA = "CLEAR_USER_DATA";
const clearUserData = () => ({ type: CLEAR_USER_DATA });

export const logout = () =>
  authAction(async (dispatch, getState) => {
    try {
      await http.post("/auth/logout", { token: getState().auth.access });
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(clearUserData());
    }
  });
