import * as types from "./actionType";

export const createPackage = (user) => {
  return {
    type: types.CREATE_PACKAGE_SUCCESS,
    payload: user,
  };
};

export const createPackageAction = (user) => {
  // console.log("data",user);
  if (user) {
    return {
      type: types.CREATE_PACKAGE_REQUEST,
      payload: user,
    };
  }
};
export const createPackageActionFail = () => {
  // console.log("data",user);
 
    return {
      type: types.CREATE_PACKAGE_FAILURE,
    };
  };
 export const createPackageActionClear=()=>{
  return {
    type:types.CLEAR_PACKAGE_REDUCER,
  }
 }

