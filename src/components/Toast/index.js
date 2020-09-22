import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const Toast = ({ open, alerts, severity, handleClose }) => {
  return (
    <Snackbar open={open} onClose={handleClose}>
      <MuiAlert elevation={6} variant="filled" severity={severity} onClose={handleClose}>
        {alerts.map((alert, i) => (
          <p key={i}>{alert}</p>
        ))}
      </MuiAlert>
    </Snackbar>
  );
};

export default Toast;
