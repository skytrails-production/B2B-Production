import * as types from "./actionType";


export const fetchSignUp = (user) => {
  return {
    type: types.SIGNUP_SUCCESS,
    payload: user,
  };
};

export const signUpAction = (user) => {
  if (user) {
    return {
      type: types.SIGNUP_REQUEST,
      payload: user,
    };
  }
};
export const signUpActionClear = () => {

  
    return {
      type: types.SIGNUP_CLEAR,
      payload: null,
    };
  
};
