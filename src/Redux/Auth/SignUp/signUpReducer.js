import * as types from "./actionType";

const initState = {
  signUpData: [],

  isLoading: false,

  isError: false,

  showSuccessMessage: false,
};

export const signUpReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        signUpData: payload,
        isLoading: false,
        isError: false,
        showSuccessMessage: true,
      };
    case types.SIGNUP_SUCCESS:
      return {
        signUpData: [],

        isLoading: false,
      
        isError: false,
      
        showSuccessMessage: false,
      };
    
      

    default:
      return initState;
  }
};
