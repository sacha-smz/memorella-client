export const SIGNUP_FORM_SUBMIT = "SIGNUP_FORM_SUBMIT";
export const signupFormSubmit = payload => ({ type: SIGNUP_FORM_SUBMIT, payload });

export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const signupSuccess = payload => ({ type: SIGNUP_SUCCESS, payload });

export const SIGNUP_ERROR = "SIGNUP_ERROR";
export const signupError = payload => ({ type: SIGNUP_ERROR, payload });

export const CLEAR_SIGNUP_ERROR = "CLEAR_SIGNUP_ERROR";
export const clearSignupError = () => ({ type: CLEAR_SIGNUP_ERROR });

export const SIGNIN_FORM_SUBMIT = "SIGNIN_FORM_SUBMIT";
export const signinFormSubmit = payload => ({ type: SIGNIN_FORM_SUBMIT, payload });

export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const signinSuccess = payload => ({ type: SIGNIN_SUCCESS, payload });

export const SIGNIN_ERROR = "SIGNIN_ERROR";
export const signinError = payload => ({ type: SIGNIN_ERROR, payload });

export const CLEAR_SIGNIN_ERROR = "CLEAR_SIGNIN_ERROR";
export const clearSigninError = () => ({ type: CLEAR_SIGNIN_ERROR });

export const LOGOUT = "LOGOUT";
export const logout = () => ({ type: LOGOUT });
