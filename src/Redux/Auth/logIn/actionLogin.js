import * as types from "./actionType";

export const fetchLogIn = (user) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: user,
  };
};

export const loginAction = (user) => {
  if (user) {
    return {
      type: types.LOGIN_REQUEST,
      payload: user,
    };
  }
};
export const loginFaliAction = (user) => {
  if (user) {
    return {
      type: types.LOGIN_FAILURE,
      payload: user,
    };
  }
};

export const logoutAction = () => {
  return {
    type: types.LOGOUT_REQUEST,
  };
};

export const clearErrorMsg = () => {
  return {
    type: types.LOGIN_CLEAR,
  };
};
