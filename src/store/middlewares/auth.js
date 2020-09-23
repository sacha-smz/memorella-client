import http from "../../utils/http";

import { newAccessToken } from "../actions/auth";
import { LOGOUT } from "../actions/user";

export default store => next => async action => {
  if (action.payload) {
    delete action.payload.intended;
  }

  switch (action.type) {
    case LOGOUT:
      const auth = store.getState().auth;

      if (!auth) return next(action);

      let { access, exp } = auth;
      const { refresh } = auth;

      if (access && exp > Date.now()) {
        action.payload.token = access;
        return next(action);
      }

      try {
        const response = await http.post("/auth/refresh", { token: refresh });
        next(newAccessToken({ access: response.data, intended: action }));
      } catch (err) {
        console.error(err);
        // next(refreshError());
      }
      break;
    default:
      next(action);
  }
};
