import React, { useRef, useCallback, useEffect } from "react";

import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import "./CardThumb.scss";

const CardThumb = ({ image, removeCard, addImageRef }) => {
  const imgRef = useRef(null);

  const { id, file, objectURL, url } = image;
  const key = id || file.name;

  useEffect(() => {
    if (addImageRef) {
      addImageRef({ key, ref: imgRef });
    }
  }, [addImageRef, key]);

  const remove = useCallback(() => {
    removeCard(key);
  }, [removeCard, key]);

  const handleDragEnd = useCallback(
    evt => {
      if (evt.dataTransfer.dropEffect === "move") {
        remove();
      }
    },
    [remove]
  );

  return (
    <div className="card-thumb">
      <IconButton aria-label="close" onClick={remove}>
        <HighlightOffIcon />
      </IconButton>

      <img
        src={objectURL || `${process.env.REACT_APP_FILES_URL}/${url}`}
        alt={id ? "Memory card" : key}
        draggable="true"
        onDragEnd={handleDragEnd}
        ref={imgRef}
      />
    </div>
  );
};

export default CardThumb;
