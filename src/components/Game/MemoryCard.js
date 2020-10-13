import React, { useMemo } from "react";

import { Paper } from "@material-ui/core";

import "./MemoryCard.scss";

const MemoryCard = ({ uniqueId, sharedId, faceUp, finder, url, handleClick }) => {
  const style = useMemo(() => (finder ? { boxShadow: "0 0 12px " + finder.color } : {}), [finder]);

  return (
    <div
      className={"memory-card" + (faceUp ? " face-up" : "")}
      onClick={() => handleClick(uniqueId, sharedId)}
      style={style}
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
