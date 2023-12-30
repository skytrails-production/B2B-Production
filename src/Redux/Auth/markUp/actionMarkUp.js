import * as types from "./actionType";

export const markUpData = (data) => {
  return {
    type: types.MARK_UP_SUCCESS,
    payload: data,
  };
};

export const markUpAction = (data) => {
  if (data) {
    return {
      type: types.MARK_UP_REQUEST,
      payload: data,
    };
  }
};
