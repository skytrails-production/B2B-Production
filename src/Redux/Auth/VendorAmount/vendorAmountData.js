import * as types from "./actionType";

export const vendorAmountData = (data) => {
  return {
    type: types.VENDOR_AMOUNT_SUCCESS,
    payload: data,
  };
};

export const vendorAction = (data) => {
 
    return {
      type: types.VENDOR_AMOUNT_REQUEST,
      payload: data
    };
  
};




