import * as types from "./actionType";

export const createForex4Customer = (user) => {
  return {
    type: types.CREATE_FOREX_WITH_CUSTOMER_SUCCESS,
    payload: user,
  };
};

export const createForex4CustomerAction = (user) => {
  // console.log("data",user);
  if (user) {
    return {
      type: types.CREATE_FOREX_WITH_CUSTOMER_REQUEST,
      payload: user,
    };
  }
};
