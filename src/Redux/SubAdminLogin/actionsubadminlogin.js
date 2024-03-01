import * as types from "./actionType";

export const subAdminLogin = (subadmin) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: subadmin,
  };
};

export const subAdminLogout = () => {
 
    return {
      type: types.LOGOUT_SUCCESS,
     
    };
  
};

export const subAdminRequest = () => {
 
    return {
      type: types.LOGIN_REQUEST,
     
    };
  
};
export const subAdminFailure = () => {
 
    return {
      type: types.LOGIN_FAILURE,
     
    };
  
};