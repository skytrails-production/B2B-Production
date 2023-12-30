import * as types from "./actionType";

const initialState = {
    userData: [],
 
};

export const UserDataReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_USERDATA:
      return {
        ...state,
        
      };
      case types.SET_USERDATA:
        return {
          ...state,
          userData: payload,
          
        };
    

    default:
      return state;
  }
};

