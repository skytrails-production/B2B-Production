import * as types from "./actionType";

export const createForex = (user) => {
  return {
    type: types.CREATE_FOREX_SUCCESS,
    payload: user,
  };
};

export const createForexAction = (user) => {
  // console.log("data",user);
  if (user) {
    return {
      type: types.CREATE_FOREX_REQUEST,
      payload: user,
    };
  }
};
