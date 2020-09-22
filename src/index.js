import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

// import * as serviceWorker from "./serviceWorker";

import store from "./store";
import App from "./containers/App";

import "destyle.css";
import "./index.scss";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
