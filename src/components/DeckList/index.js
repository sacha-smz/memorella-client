import React, { useEffect } from "react";
import moment from "moment";

import { Link } from "react-router-dom";
import {
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";

import Page from "../Page";

const fromNow = date => (date ? moment(date).fromNow() : "N/A");

const displayFn = new Map([
  ["created_at", fromNow],
  ["updated_at", fromNow],
  ["cards", cards => cards.length]
]);

const DeckList = ({ deck, fetchDecks }) => {
  useEffect(() => {
    fetchDecks();
  }, [fetchDecks]);

  return deck.list && deck.list.length ? (
    <Page>
      <Typography component="h1" variant="h4">
        Deck list
      </Typography>

      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {Object.keys(deck.list[0]).map(field => (
                <TableCell key={field}>{field}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {deck.list.map(currDeck => (
              <TableRow key={currDeck.id}>
                {Object.entries(currDeck).map(([key, val]) => (
                  <TableCell key={key}>
                    <Link to={"/admin/decks/" + currDeck.id}>
                      {displayFn.has(key) ? displayFn.get(key)(val) : val}
                    </Link>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Page>
  ) : (
    <p>Empty deck list</p>
  );
};

export default DeckList;
