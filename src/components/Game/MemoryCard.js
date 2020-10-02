import React, { useRef } from "react";

import { Paper } from "@material-ui/core";

import "./MemoryCard.scss";

const MemoryCard = ({ url }) => {
  const frontRef = useRef();
  const backRef = useRef();

  const handleClick = () => {
    frontRef.current.classList.toggle("face-up");
    backRef.current.classList.toggle("face-up");
  };

  return (
    <div className="memory-card">
      <Paper ref={frontRef} className="front" elevation={3} onClick={handleClick}>
        <img src={`${process.env.REACT_APP_FILES_URL}/${url}`} alt="Memory card front" />
      </Paper>
      <Paper ref={backRef} className="back face-up" onClick={handleClick}>
        <img src={process.env.REACT_APP_API_URL + "/img/patterns/004.jpg"} alt="Memory card back" />
      </Paper>
    </div>
  );
};

export default MemoryCard;
