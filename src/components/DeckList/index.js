import React, { useEffect } from "react";
import moment from "moment";

import {
  Paper,
  Toolbar,
  IconButton,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import Page from "../Page";
import Link from "../Link";

import "./DeckList.scss";

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
    <Page className="deck-list">
      <Toolbar classes={{ root: "table-toolbar" }}>
        <Typography component="h1" variant="h6">
          Deck list
        </Typography>
        <Link to="/admin/decks/new">
          <IconButton color="primary">
            <AddCircleOutlineIcon fontSize="large" />
          </IconButton>
        </Link>
      </Toolbar>

      <TableContainer classes={{ root: "table-container" }} component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {Object.keys(deck.list[0]).map(field => (
                <TableCell key={field} align="center">
                  {field}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {deck.list.map(currDeck => (
              <Link key={currDeck.id} to={"/admin/decks/" + currDeck.id}>
                <TableRow hover>
                  {Object.entries(currDeck).map(([key, val]) => (
                    <TableCell key={key} align="center">
                      {displayFn.has(key) ? displayFn.get(key)(val) : val}
                    </TableCell>
                  ))}
                </TableRow>
              </Link>
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
