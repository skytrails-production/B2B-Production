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
