import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  CLEAR_SIGNUP_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  CLEAR_SIGNIN_ERROR,
  CLEAR_USER_DATA
} from "../actions/user";

const sessionState = sessionStorage.getItem("userState");
const initialState = JSON.parse(sessionState) || {
  data: null,
  signupError: null,
  signinError: null
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return { ...state, data: { ...action.payload }, signupError: null };
    case SIGNUP_ERROR:
      return { ...state, signupError: { ...action.payload } };
    case CLEAR_SIGNUP_ERROR:
      return { ...state, signupError: null };
    case SIGNIN_SUCCESS:
      const newState = { ...state, data: { ...action.payload.data }, signinError: null };
      sessionStorage.setItem("userState", JSON.stringify(newState));
      return newState;
    case SIGNIN_ERROR:
      return { ...state, signinError: { ...action.payload } };
    case CLEAR_SIGNIN_ERROR:
      return { ...state, signinError: null };
    case CLEAR_USER_DATA:
      sessionStorage.removeItem("userState");
      return { ...state, data: null };
    default:
      return state;
  }
};
