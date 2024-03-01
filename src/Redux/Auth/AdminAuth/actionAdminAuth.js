import * as types from "./actionType";

export const fetchAdminAuth = (user) => {
  return {
    type: types.ADMIN_AUTH_SUCCESS,
    payload: user,
  };
};

export const adminAuthAction = (user) => {
  if (user) {
    return {
      type: types.ADMIN_AUTH_REQUEST,
      payload: user,
    };
  }
  
};

export const adminAuthLogOutAction = () => {
 
    return {
      type: types.ADMIN_AUTH_LOG_OUT_REQUEST,
      
    };
  
  
};
