import http from "../../utils/http";

export const NEW_ACCESS_TOKEN = "NEW_ACCESS_TOKEN";
const newAccessToken = payload => ({ type: NEW_ACCESS_TOKEN, payload });

export const UNAUTHORIZED = "UNAUTHORIZED";
const unauthorized = () => ({ type: UNAUTHORIZED });

export const authAction = action => async (dispatch, getState) => {
  const auth = getState().auth;

  if (!auth) return dispatch(unauthorized());

  let { access, exp } = auth;
  if (access && exp > Date.now()) {
    return dispatch(action);
  }

  const { refresh } = auth;
  try {
    const response = await http.post("/auth/refresh", { token: refresh });
    dispatch(newAccessToken({ access: response.data }));
    dispatch(action);
  } catch (err) {
    console.error(err);
    // next(refreshError());
  }
};
