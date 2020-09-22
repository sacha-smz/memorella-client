import http from "../../utils/http";

import { signupSuccess, signupError, SIGNUP_FORM_SUBMIT } from "../actions/user";

export default store => next => async action => {
  switch (action.type) {
    case SIGNUP_FORM_SUBMIT:
      try {
        const response = await http.post("/users", { data: action.payload });
        next(signupSuccess(response.data));
      } catch (err) {
        next(signupError(err));
        console.error(err);
      }
      break;
    default:
      next(action);
  }
};
