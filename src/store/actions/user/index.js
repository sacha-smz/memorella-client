export const SIGNUP_FORM_SUBMIT = "SIGNUP_FORM_SUBMIT";
export const signupFormSubmit = payload => ({ type: SIGNUP_FORM_SUBMIT, payload });

export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const signupSuccess = payload => ({ type: SIGNUP_SUCCESS, payload });

export const SIGNUP_ERROR = "SIGNUP_ERROR";
export const signupError = err => ({ type: SIGNUP_ERROR, payload: err });

export const CLEAR_SIGNUP_ERROR = "CLEAR_SIGNUP_ERROR";
export const clearSignupError = () => ({ type: CLEAR_SIGNUP_ERROR });
