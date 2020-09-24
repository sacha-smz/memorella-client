import { NEW_ACCESS_TOKEN } from "../actions/auth";
import { SIGNIN_SUCCESS, LOGOUT } from "../actions/user";

const initialState = null;

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case NEW_ACCESS_TOKEN: {
      const { access, intended } = action.payload;
      return { ...state, access, exp: getTokenExp(), intended };
    }
    case SIGNIN_SUCCESS: {
      const { access, refresh } = action.payload;
      return { ...state, access, refresh, exp: getTokenExp() };
    }
    case LOGOUT:
      return null;
    default:
      return state;
  }
};

function getTokenExp() {
  // return Date.now() + 10 * 60 * 1000;
  return Date.now() + 20 * 1000;
}
