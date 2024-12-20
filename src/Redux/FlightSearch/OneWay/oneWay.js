import * as types from "./oneWayActionType";

export const fetchOneWay = (data) => {
  return {
    type: types.ONE_WAY_SUCCESS,
    payload: data,    
  };
};

export const oneWayAction = (data) => {
  if (data) {
    return {
      type: types.ONE_WAY_REQUEST,
      payload: data,
    };
  }
};
// export const oneWayEMTAction = (data) => {
//   if (data) {
//     return {
//       type: types.ONE_WAY_REQUEST,
//       payload: data,
//     };
//   }
// };

export const clearOneWayReducer = () => {
  return {
    type: types.CLEAR_ONEWAY_REDUCER,
  };
};
