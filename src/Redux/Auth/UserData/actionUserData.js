import * as types from "./actionType";

export const userData = (userData) => {
  return {
    type: types.SET_USER_DATA,
    payload: userData,
  };
};

export const getUserAction = () => {
    return {
      type: types.GET_USER_DATA,
     
    };
  
};


