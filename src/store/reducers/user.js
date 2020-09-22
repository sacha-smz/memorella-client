import { SIGNUP_SUCCESS, SIGNUP_ERROR, CLEAR_SIGNUP_ERROR } from "../actions/user";

const initialState = {
  data: null,
  signupError: null
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return { ...state, data: { ...action.payload }, signupError: null };
    case SIGNUP_ERROR:
      return { ...state, signupError: { ...action.payload } };
    case CLEAR_SIGNUP_ERROR:
      return { ...state, signupError: null };
    default:
      return state;
  }
};
