import * as types from "./actionType";

const initialState = {
    forexData: [],
 
};

export const forexDataReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_FOREX_DATA:
      return {
        ...state,
        
      };
      case types.SET_FOREX_DATA:
        return {
          ...state,
          forexData: payload,
          
        };
    

    default:
      return state;
  }
};

