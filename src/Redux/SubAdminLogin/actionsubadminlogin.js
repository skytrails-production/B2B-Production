import * as types from "./actionType";

export const subAdminLogin = (subadmin) => {
  return {
    type: types.SUBADMIN_LOGIN_SUCCESS,
    payload: subadmin,
  };
};

export const subAdminLogout = () => {
 
    return {
      type: types.SUBADMIN_LOGOUT_SUCCESS,
     
    };
  
};

export const subAdminRequest = () => {
 
    return {
      type: types.SUBADMIN_LOGIN_REQUEST,
     
    };
  
};
export const subAdminFailure = () => {
 
    return {
      type: types.SUBADMIN_LOGIN_FAILURE,
     
    };
  
};