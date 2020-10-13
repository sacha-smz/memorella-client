import React, { useState, useEffect, useCallback, useMemo } from "react";

import { FormControl, InputLabel, Select, MenuItem, IconButton } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import { MAX_PLAYERS_NBR, PLAYER_COLORS } from "../../constants";

import Page from "../Page";
import PlayerName from "./PlayerName";
import MemoryCard from "./MemoryCard";

import "./Game.scss";

const Game = ({ decks, fetchDecks }) => {
  useEffect(() => {
    fetchDecks();
  }, [fetchDecks]);

  const [players, setPlayers] = useState([{ name: "", color: PLAYER_COLORS[0], score: 0 }]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [deck, setDeck] = useState({ id: "", name: "" });
  const [rows, setRows] = useState([]);
  const [foundCards, setFoundCards] = useState(new Map());
  const [pair, setPair] = useState([]);
  const [showdown, setShowdown] = useState(null);

  const availableColors = useMemo(
    () => PLAYER_COLORS.filter(color => !players.some(player => player.color === color)),
    [players]
  );

  const addPlayer = useCallback(() => {
    if (players.length >= MAX_PLAYERS_NBR) return;
    setPlayers([...players, { name: "", color: availableColors[0], score: 0 }]);
  }, [players, availableColors]);

  const updatePlayer = useCallback(
    (index, key, val) => {
      if (typeof players[index] === "undefined") return;
      const newPlayers = [...players];
      newPlayers[index][key] = val;
      setPlayers(newPlayers);
    },
    [players]
  );

  const removePlayer = useCallback(
    index => {
      if (typeof players[index] === "undefined") return;
      const newPlayers = [...players];
      newPlayers.splice(index, 1);
      setPlayers(newPlayers);
    },
    [players]
  );

  const getFinder = useCallback(id => players[foundCards.get(id)], [players, foundCards]);

  const faceUp = useCallback(
    (uniqueId, sharedId) => {
      return pair.some(card => card.uniqueId === uniqueId) || foundCards.has(sharedId);
    },
    [pair, foundCards]
  );

  const handleChange = useCallback(
    evt => {
      setPair([]);
      setFoundCards(new Map());

      const deckId = parseInt(evt.target.value, 10);
      const newDeck = decks.find(deck => deck.id === deckId);
      const { id, name, cards } = newDeck;
      setDeck({ id, name });
      setRows(getRows(getShuffledPairs(cards)));
    },
    [decks]
  );

  const handleCardClick = useCallback(
    (uniqueId, sharedId) => {
      if (faceUp(uniqueId, sharedId)) return;

      if (showdown) {
        clearTimeout(showdown);
        setShowdown(null);
      }

      if (pair.length === 1) {
        if (sharedId === pair[0].sharedId) {
          const newFoundCards = new Map(foundCards);
          newFoundCards.set(sharedId, currentPlayer);
          setFoundCards(newFoundCards);
          updatePlayer(currentPlayer, "score", players[currentPlayer].score + 1);
        } else {
          setCurrentPlayer((currentPlayer + 1) % players.length);
          setShowdown(
            setTimeout(() => {
              setPair([]);
            }, 2400)
          );
        }

        setPair([pair[0], { sharedId, uniqueId }]);
      } else {
        setPair([{ sharedId, uniqueId }]);
      }
    },
    [faceUp, players, currentPlayer, updatePlayer, showdown, pair, foundCards]
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

      <ul>
        {players.map((player, i) => {
          return (
            <li key={i}>
              <PlayerName
                index={i}
                active={currentPlayer === i}
                {...{ player, updatePlayer, removePlayer }}
              />
              <span>{player.score}</span>
            </li>
          );
        })}
      </ul>
      {players.length < MAX_PLAYERS_NBR && (
        <>
          <IconButton color="primary" onClick={addPlayer}>
            <AddCircleOutlineIcon fontSize="large" />
          </IconButton>
          <span>Max {MAX_PLAYERS_NBR}</span>
        </>
      )}

      {rows.length > 0 && (
        <div className="grid">
          {rows.map((row, i) => (
            <div className="grid__row" key={i}>
              {row.map(({ key, id, url }) => {
                const uniqueId = key || id;
                return (
                  <MemoryCard
                    key={uniqueId}
                    uniqueId={uniqueId}
                    sharedId={id}
                    url={url}
                    handleClick={handleCardClick}
                    faceUp={faceUp(uniqueId, id)}
                    finder={getFinder(id)}
                  />
                );
              })}
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
