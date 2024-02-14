import * as types from "./actionType";

export const createVisaRequest = (user) => {
  return {
    type: types.VISA_SUCCESS,
    payload: user,
  };
};

export const createVisaAction = (user) => {
  // console.log("data of",user);
  if (user) {
    return {
      type: types.VISA_REQUEST,
      payload: user,
    };
  }
};
