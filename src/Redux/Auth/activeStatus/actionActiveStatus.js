import * as types from "./actionType";

export const fetchActiveStatus = () => {
  return {
    type: types.ACTIVE_STATUS_SUCCESS,
  };
};
export const activeStatusAction = (data) => {
  if (data) {
    return {
      type: types.ACTIVE_STATUS_REQUEST,
      payload: data,
    };
  }
};
