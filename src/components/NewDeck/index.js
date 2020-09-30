import React, { useState, useEffect, useCallback, useReducer, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";

import { imageRefsReducer } from "./state/reducers";
import { addRef, removeRef } from "./state/actions";

import { Typography, TextField, Button } from "@material-ui/core";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";

import Page from "../Page";
import CardThumb from "./CardThumb";

import "./NewDeck.scss";

const NewDeck = ({ fetchDeck, deckSubmit, decks }) => {
  const id = parseInt(useParams().id, 10);
  const oldDeck = useMemo(() => decks.find(deck => deck.id === id), [decks, id]);

  const [deckName, setDeckName] = useState("");
  const [images, setImages] = useState(new Map());
  const [oldImages, setOldImages] = useState([]);
  const [removedCards, setRemovedCards] = useState([]);

  const [imageRefs, dispatchImageRefs] = useReducer(imageRefsReducer);

  useEffect(() => {
    if (oldDeck) {
      setDeckName(oldDeck.name);
      setOldImages(oldDeck.cards);
    } else if (id) {
      fetchDeck(id);
    }
  }, [id, oldDeck, fetchDeck]);

  useEffect(
    () => () => {
      for (const image of images.values()) {
        URL.revokeObjectURL(image.objectURL);
      }
    },
    [images]
  );

  const handleChange = useCallback(evt => {
    setDeckName(evt.target.value);
  }, []);

  const addImageRef = useCallback(payload => {
    dispatchImageRefs(addRef(payload));
  }, []);

  const removeImageRef = useCallback(payload => {
    dispatchImageRefs(removeRef(payload));
  }, []);

  const removeCard = useCallback(
    key => {
      URL.revokeObjectURL(images.get(key).objectURL);
      const newImages = new Map(images);
      newImages.delete(key);
      setImages(newImages);
      removeImageRef(key);
    },
    [images, removeImageRef]
  );

  const removeOldCard = useCallback(
    id => {
      const oldImageIndex = oldImages.findIndex(image => image.id === id);
      if (oldImageIndex > -1) {
        const newOldImages = [...oldImages];
        newOldImages.splice(oldImageIndex, 1);
        setOldImages(newOldImages);
        setRemovedCards([...removedCards, id]);
      }
    },
    [oldImages, removedCards]
  );

  const onDrop = useCallback(
    files => {
      const newImages = new Map(images);
      for (const file of files) {
        newImages.set(file.name, { file, objectURL: URL.createObjectURL(file) });
      }
      setImages(newImages);
    },
    [images]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 1000 * 1000,
    maxFiles: 64,
    noClick: true
  });

  const onSubmit = useCallback(
    async evt => {
      evt.preventDefault();

      const formData = new FormData();

      formData.set("name", deckName);

      for (const image of images.values()) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const img = imageRefs.get(image.file.name).current;

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
        const blob = await toBlob(canvas, mimetype, 0.8);
        formData.append("cards[]", new File([blob], image.file.name, { type: mimetype }));
      }

      if (id) {
        removedCards.forEach(cardId => {
          formData.append("removed_cards[]", cardId);
        });
      }

      setImages(new Map());
      deckSubmit({ id, data: formData });
    },
    [deckName, images, imageRefs, removedCards, deckSubmit, id]
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
            {oldImages.map(image => (
              <CardThumb key={image.id} image={image} removeCard={removeOldCard} />
            ))}
            {Array.from(images.values()).map(image => (
              <CardThumb key={image.file.name} {...{ image, removeCard, addImageRef }} />
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

function toBlob(canvas, type, quality) {
  return new Promise(resolve => {
    canvas.toBlob(
      blob => {
        resolve(blob);
      },
      type,
      quality
    );
  });
}
