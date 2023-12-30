import * as types from "./actionType";

const initialState = {
    visaData: [],
 
};

export const visaDataReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_VISA_DATA:
      return {
        ...state,
        
      };
      case types.SET_VISA_DATA:
        return {
          ...state,
          visaData: payload,
          
        };
    

    default:
      return state;
  }
};

