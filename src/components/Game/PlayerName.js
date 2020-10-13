import React, { useCallback, useMemo } from "react";

import { IconButton, TextField } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const PlayerName = ({ index, player, updatePlayer, removePlayer, active }) => {
  const { name, color } = player;

  const style = useMemo(() => (active ? { boxShadow: "0 0 12px " + color } : {}), [active, color]);

  const handleChange = useCallback(
    evt => {
      updatePlayer(index, "name", evt.target.value);
    },
    [index, updatePlayer]
  );

  const remove = useCallback(() => {
    removePlayer(index);
  }, [index, removePlayer]);

  return (
    <>
      <TextField
        value={name}
        onChange={handleChange}
        label={`Player ${index + 1}'s name`}
        style={style}
      />
      {index > 0 && (
        <IconButton aria-label="close" onClick={remove}>
          <HighlightOffIcon />
        </IconButton>
      )}
    </>
  );
};

export default PlayerName;
