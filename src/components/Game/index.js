import React, { useState, useEffect, useCallback } from "react";

import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

import Page from "../Page";
import MemoryCard from "./MemoryCard";

import "./Game.scss";

const Game = ({ decks, fetchDecks }) => {
  const [deck, setDeck] = useState({ id: "", name: "" });
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchDecks();
  }, [fetchDecks]);

  const handleChange = useCallback(
    evt => {
      const deckId = parseInt(evt.target.value, 10);
      const newDeck = decks.find(deck => deck.id === deckId);
      const { id, name, cards } = newDeck;
      setDeck({ id, name });
      setRows(getRows(getShuffledPairs(cards)));
    },
    [decks]
  );

  return (
    <Page className="game-board">
      {decks && decks.length > 0 && (
        <FormControl>
          <InputLabel>Theme</InputLabel>
          <Select value={deck.id} onChange={handleChange}>
            <MenuItem value="" disabled>
              Choisir un theme
            </MenuItem>
            {decks.map(deck => (
              <MenuItem key={deck.id} value={deck.id}>
                {deck.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {rows.length > 0 && (
        <div className="grid">
          {rows.map((row, i) => (
            <div className="grid__row" key={i}>
              {row.map(({ key, id, url }) => (
                <MemoryCard url={url} key={key || id} />
              ))}
            </div>
          ))}
        </div>
      )}
    </Page>
  );
};

export default Game;

function getRows(cards) {
  const [rows, columns] = getGridDimensions(cards);
  const grid = [];
  for (let i = 0; i < rows; i++) {
    const offset = i * columns;
    grid.push(cards.slice(offset, offset + columns));
  }
  return grid;
}

function getGridDimensions(cards) {
  const cardsNbr = cards.length;
  if (!cardsNbr) return [0, 0];

  for (let rows = Math.floor(Math.sqrt(cardsNbr)); rows >= 1; rows--) {
    const columns = cardsNbr / rows;
    if (columns % 1 === 0) return [rows, columns];
  }
}

function getShuffledPairs(cards) {
  const pairs = [...cards, ...cards.map(card => ({ ...card, key: card.id + "B" }))];
  shuffle(pairs);
  return pairs;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const randIndex = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[randIndex]] = [arr[randIndex], arr[i]];
  }
}
