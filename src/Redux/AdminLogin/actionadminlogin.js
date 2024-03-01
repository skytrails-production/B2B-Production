import * as types from "./actionType";

export const AdminLogin = (subadmin) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: subadmin,
  };
};

export const AdminLogout = () => {
 
    return {
      type: types.LOGOUT_SUCCESS,
     
    };
  
};

export const AdminRequest = () => {
 
    return {
      type: types.LOGIN_REQUEST,
     
    };
  
};
export const AdminFailure = () => {
 
    return {
      type: types.LOGIN_FAILURE,
     
    };
  
};