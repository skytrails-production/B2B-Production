import * as types from "./oneWayEMTActionType";

export const fetchOneWayEMT = (data) => {
  return {
    type: types.ONE_WAY_EMT_SUCCESS,
    payload: data,
  };
};

export const oneWayEMTAction = (data) => {
  if (data) {
    return {
      type: types.ONE_WAY_EMT_REQUEST,
      payload: data,
    };
  }
};

export const clearOneWayEMTReducer = () => {
  return {
    type: types.CLEAR_ONEWAY_EMT_REDUCER,
  };
  
};
