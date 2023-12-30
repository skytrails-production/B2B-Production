import * as types from "./actionType";

export const forex4CustomerData = (forexData) => {
  return {
    type: types.SET_FOREX_4_CUSTOMER,
    payload: forexData,
  };
};

export const getForex4CustomerAction = () => {
    return {
      type: types.GET_FOREX_4_CUSTOMER,
     
    };
  
};


