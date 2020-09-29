import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { Typography, TextField, Button } from "@material-ui/core";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";

import Page from "../Page";
import CardThumb from "./CardThumb";

import "./NewDeck.scss";

const NewDeck = ({ deckSubmit }) => {
  const [deckName, setDeckName] = useState("");
  const [cards, setCards] = useState(new Map());

  useEffect(() => () => {
    for (const card of cards.values()) {
      URL.revokeObjectURL(card.objectURL);
    }
  });

  const handleChange = useCallback(evt => {
    setDeckName(evt.target.value);
  }, []);

  const removeCard = useCallback(
    name => {
      URL.revokeObjectURL(cards.get(name).objectURL);
      const newCards = new Map(cards);
      newCards.delete(name);
      setCards(newCards);
    },
    [cards]
  );

  const setCardImgRef = useCallback(
    (name, imgRef) => {
      const newCards = new Map(cards);
      newCards.get(name).imgRef = imgRef;
    },
    [cards]
  );

  const onDrop = useCallback(
    files => {
      const newCards = new Map(cards);
      for (const file of files) {
        newCards.set(file.name, { file, objectURL: URL.createObjectURL(file) });
      }
      setCards(newCards);
    },
    [cards]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 1000 * 1000,
    maxFiles: 64,
    noClick: true
  });

  const onSubmit = useCallback(
    evt => {
      evt.preventDefault();

      const formData = new FormData();
      formData.set("name", deckName);
      for (const card of cards.values()) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const img = card.imgRef.current;

        const [imgWidth, imgHeight] = [img.naturalWidth, img.naturalHeight];
        const length = Math.min(imgWidth, imgHeight);
        canvas.width = Math.min(320, length);
        canvas.height = canvas.width;

        ctx.drawImage(
          img,
          (imgWidth - length) / 2,
          (imgHeight - length) / 2,
          length,
          length,
          0,
          0,
          canvas.width,
          canvas.height
        );

        const mimetype = "image/jpeg";
        canvas.toBlob(
          blob => {
            formData.append("cards[]", new File([blob], card.file.name, { type: mimetype }));
          },
          mimetype,
          0.8
        );
      }
      deckSubmit(formData);
    },
    [cards, deckName, deckSubmit]
  );

  return (
    <Page className="new-deck">
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <Typography component="h1" variant="h4">
          New deck
        </Typography>

        <TextField
          value={deckName}
          label="Deck name"
          autoFocus={true}
          onChange={handleChange}
          autoComplete="on"
          required
          fullWidth
        />

        <div className="drop-container">
          <div className="drop-zone" {...getRootProps()}>
            {Array.from(cards.values()).map(card => (
              <CardThumb key={card.file.name} {...{ card, removeCard, setCardImgRef }} />
            ))}
          </div>

          <div className="drop-icon">
            <PhotoLibraryIcon color={isDragActive ? "primary" : "action"} fontSize="large" />
          </div>
        </div>

        <input {...getInputProps()} />

        <Button variant="contained" color="primary" size="large" type="submit">
          Valider
        </Button>
      </form>
    </Page>
  );
};

export default NewDeck;
