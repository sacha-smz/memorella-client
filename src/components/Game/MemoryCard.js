import React from "react";

import { Paper } from "@material-ui/core";

import "./MemoryCard.scss";

const MemoryCard = ({ uniqueId, sharedId, faceUp, url, handleClick }) => {
  return (
    <div
      className={"memory-card" + (faceUp ? " face-up" : "")}
      onClick={() => handleClick(uniqueId, sharedId)}
    >
      <Paper className="front" elevation={2}>
        <img src={`${process.env.REACT_APP_FILES_URL}/${url}`} alt="Memory card front" />
      </Paper>
      <Paper className="back" elevation={2}>
        <img src={process.env.REACT_APP_API_URL + "/img/patterns/002.jpg"} alt="Memory card back" />
      </Paper>
    </div>
  );
};

export default MemoryCard;
