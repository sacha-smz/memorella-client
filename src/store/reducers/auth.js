import { NEW_ACCESS_TOKEN } from "../actions/auth";
import { SIGNIN_SUCCESS, CLEAR_USER_DATA } from "../actions/user";

const sessionState = sessionStorage.getItem("authState");
const initialState = JSON.parse(sessionState) || null;

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case NEW_ACCESS_TOKEN: {
      const { access } = action.payload;
      return { ...state, access, exp: getTokenExp() };
    }
    case SIGNIN_SUCCESS: {
      const { access, refresh } = action.payload;
      const newState = { ...state, access, refresh, exp: getTokenExp() };
      sessionStorage.setItem("authState", JSON.stringify(newState));
      return newState;
    }
    case CLEAR_USER_DATA:
      sessionStorage.removeItem("authState");
      return null;
    default:
      return state;
  }
};

function getTokenExp() {
  // return Date.now() + 10 * 60 * 1000;
  return Date.now() + 20 * 1000;
}
