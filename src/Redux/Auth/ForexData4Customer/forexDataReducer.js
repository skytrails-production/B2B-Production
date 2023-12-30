import * as types from "./actionType";

const initialState = {
    forexData4Customer: [],
 
};

export const forexData4CustomerReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_FOREX_4_CUSTOMER:
      return {
        ...state,
        
      };
      case types.SET_FOREX_4_CUSTOMER:
        return {
          ...state,
          forexData4Customer: payload,
          
        };
    

    default:
      return state;
  }
};

