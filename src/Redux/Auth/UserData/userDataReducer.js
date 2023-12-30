import * as types from "./actionType";

const initialState = {
    userData: [],
 
};

export const UserTableDataReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_USER_DATA:
      return {
        ...state,
        
      };
      case types.SET_USER_DATA:
        return {
          ...state,
          userData: payload,
          
        };
    

    default:
      return state;
  }
};

