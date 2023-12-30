import * as types from "./actionType";

export const updatePackageData = (data) => {
  return {
    type: types.UPDATE_PACKAGE_SUCCESS,
    payload: data,
  };
};

export const updatePackageAction = (data) => {

//  console.log("============================")
//  console.log("updated Data",data)
    return {
      type: types.UPDATE_PACKAGE_REQUEST,
      payload: data
    };
  
};




