import { LOCATION_CHANGE } from "../actions/history";

const initialState = {
  locations: { first: null, current: null, last: null }
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return { ...state, locations: { ...action.payload } };
    default:
      return state;
  }
};
