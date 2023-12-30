import * as types from "./actionType";

const initialState = {
  loginData: [],
  isLogin: false,
  isLoading: false,
  isError: false,
};

export const logInReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loginData: payload,
        token: payload,
        isLoading: false,
        isError: false,
      };

    case types.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
      case types.LOGIN_FAILURE:
        return {
          ...state,
          isLogin:false,
          isLoading:false,
          isError:true,
        }

    default:
      return state;
  }
};
