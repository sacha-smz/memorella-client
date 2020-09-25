import http from "../../utils/http";

import { authAction } from "./auth";

export const DECK_SUCCESS = "DECK_SUCCESS";
const deckSuccess = payload => ({ type: DECK_SUCCESS, payload });

export const deckSubmit = payload =>
  authAction(async (dispatch, getState) => {
    try {
      const response = await http.post("/admin/decks", {
        data: payload,
        headers: {
          "Content-Type": "multipart/form-data"
        },
        token: getState().auth.access
      });
      dispatch(deckSuccess(response.data));
    } catch (err) {
      console.error(err);
    }
  });

export const FETCH_DECKS_SUCCESS = "FETCH_DECKS_SUCCESS";
const fetchDecksSuccess = payload => ({ type: FETCH_DECKS_SUCCESS, payload });

export const fetchDecks = () => async dispatch => {
  try {
    const response = await http.get("/decks");
    dispatch(fetchDecksSuccess(response.data));
  } catch (err) {
    console.error(err);
  }
};
