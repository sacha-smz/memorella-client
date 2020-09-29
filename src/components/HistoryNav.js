import React from "react";
import { useHistory } from "react-router-dom";

import { IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const HistoryNav = ({ locations }) => {
  const history = useHistory();

  const { first, last, current } = locations;

  return (
    <nav className="history-nav">
      <IconButton
        disabled={!first || (first !== last && current === first)}
        onClick={history.goBack}
      >
        <ArrowBackIcon />
      </IconButton>
      <IconButton disabled={!last || current === last} onClick={history.goForward}>
        <ArrowForwardIcon />
      </IconButton>
    </nav>
  );
};

export default HistoryNav;
