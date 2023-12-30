import * as types from "./actionType";

export const balanceSubtractRequest = (payload) => {
    // console.log(payload, 'balance subtract payload');
    if(payload){
    return {
    type: types.BALANCE_SUBTRACT_REQUEST,
    payload,
    };
  }
  };
  
  export const balanceSubtractSuccess = (response) => {
    return {
    type: types.BALANCE_SUBTRACT_SUCCESS,
    response,
    }
  };
  
 export  const balanceSubtractFailure = (error) => {
    return {
    type: types.BALANCE_SUBTRACT_FAILURE,
    error,
    }
  };
  