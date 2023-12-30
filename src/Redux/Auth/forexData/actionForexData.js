import * as types from "./actionType";

export const forexData = (forexData) => {
  return {
    type: types.SET_FOREX_DATA,
    payload: forexData,
  };
};

export const getForexAction = () => {
    return {
      type: types.GET_FOREX_DATA,
     
    };
  
};


