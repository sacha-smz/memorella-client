import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import auth from "./auth";
import user from "./user";

export default composeWithDevTools(applyMiddleware(auth, user));
