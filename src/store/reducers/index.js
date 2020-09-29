import { combineReducers } from "redux";

import history from "./history";
import auth from "./auth";
import user from "./user";
import deck from "./deck";

export default combineReducers({ history, auth, user, deck });
