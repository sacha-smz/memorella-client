import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer from "./reducers";
import userMiddleware from "./middlewares/user";

export default createStore(reducer, composeWithDevTools(applyMiddleware(userMiddleware)));
