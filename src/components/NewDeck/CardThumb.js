import React, { useState, useEffect, useRef, useCallback } from "react";

import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import "./CardThumb.scss";

const CardThumb = ({ card, removeCard, setCardImgRef }) => {
  const [draggedCard, setDraggedCard] = useState(null);
  const imgRef = useRef(null);

  useEffect(() => {
    setCardImgRef(card.file.name, imgRef);
  }, [setCardImgRef, card.file.name]);

  const handleDragStart = useCallback(() => {
    setDraggedCard(card.file.name);
  }, [card.file.name]);

  const handleDragEnd = useCallback(
    evt => {
      if (evt.dataTransfer.dropEffect === "move") {
        removeCard(draggedCard);
      }
      setDraggedCard(null);
    },
    [draggedCard, removeCard]
  );

  return (
    <div className="card-thumb">
      <IconButton
        aria-label="close"
        onClick={() => {
          removeCard(card.file.name);
        }}
      >
        <HighlightOffIcon />
      </IconButton>

      <img
        src={card.objectURL}
        alt={card.file.name}
        draggable="true"
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        ref={imgRef}
      />
    </div>
  );
};

export default CardThumb;
