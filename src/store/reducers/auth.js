import { NEW_ACCESS_TOKEN } from "../actions/auth";

const initialState = null;

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case NEW_ACCESS_TOKEN:
      const { access, intended } = action.payload;
      return { ...state, access, exp: Date.now() + 10 * 60 * 1000, intended };
    default:
      return state;
  }
};
