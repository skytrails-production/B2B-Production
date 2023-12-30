import * as types from "./actionType";

export const userData = (userData) => {
  return {
    type: types.SET_USERDATA,
    payload: userData,
  };
};

export const getUserDataAction = (data) => {
  if(data){
    return {
      type: types.GET_USERDATA,
       payload:data
    };
  }
    
  
};


export const clearUserReducer = () => {
  return {
    type: types.CLEAR_USERDATA_REDUCER,
  };
};