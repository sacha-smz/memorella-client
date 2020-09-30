import http from "../../utils/http";

import { authAction } from "./auth";

export const ADD_DECK = "ADD_DECK";
const addDeck = payload => ({ type: ADD_DECK, payload });

export const deckSubmit = ({ id, data }) =>
  authAction(async (dispatch, getState) => {
    const [url, method] = id ? ["/admin/decks/" + id, "PATCH"] : ["/admin/decks", "POST"];

    const options = {
      method,
      data,
      headers: {
        "Content-Type": "multipart/form-data"
      },
      token: getState().auth.access
    };

    try {
      const response = await http.fetch(url, options);

      const payload = response.data;

      if (id) {
        payload.removedCards = data.getAll("removed_cards[]").map(Number);
      }

      dispatch(addDeck(response.data));
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

export const fetchDeck = id => async (dispatch, getState) => {
  if (getState().deck.list.some(deck => deck.id === id)) return;

  try {
    const response = await http.get("/decks/" + id);
    dispatch(addDeck(response.data));
  } catch (err) {
    console.error(err);
  }
};
