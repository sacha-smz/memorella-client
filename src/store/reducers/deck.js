import { FETCH_DECKS_SUCCESS } from "../actions/deck";

const initialState = {
  list: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_DECKS_SUCCESS:
      return { ...state, list: [...action.payload] };
    default:
      return state;
  }
};
