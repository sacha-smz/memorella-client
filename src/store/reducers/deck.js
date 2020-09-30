import { FETCH_DECKS_SUCCESS, ADD_DECK } from "../actions/deck";

const initialState = {
  list: []
};

export default (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case FETCH_DECKS_SUCCESS:
      return { ...state, list: [...payload] };
    case ADD_DECK:
      const list = [...state.list];
      const deckIndex = list.findIndex(deck => deck.id === payload.id);
      if (deckIndex > -1) {
        const { cards: oldCards } = list[deckIndex];
        const { removedCards, cards: newCards } = payload;

        let cards = [];
        if (removedCards && removedCards.length) {
          cards = oldCards.filter(({ id }) => !removedCards.includes(id));
        }
        if (newCards && newCards.length) {
          cards.push(...newCards);
        }

        delete payload.removedCards;
        list[deckIndex] = { ...payload, cards };
      } else {
        list.push(payload);
      }
      return { ...state, list };
    default:
      return state;
  }
};
