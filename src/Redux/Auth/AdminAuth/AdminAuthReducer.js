import * as types from "./actionType";

const initialState = {
  adminData: [],
  isLogin: false,
  isLoading: false,
  isError: false,
};

export const AdminAuthReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.ADMIN_AUTH_SUCCESS:
      return {
        ...state,
        adminData: payload,
        isLoading: false,
        isError: false,
        isLogin: true,
        
      };

    case types.ADMIN_AUTH_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case types.ADMIN_AUTH_LOG_OUT_REQUEST:
      return {
        adminData: [],
        isLogin: false,
        isLoading: false,
        isError: false,
        isLogin: false,
      };
    case types.ADMIN_AUTH_FAIL:
      return {
        adminData: payload,
        isLogin: false,
        isLoading: false,
        isError: false,
        isLogin: false,
      };

    default:
      return state;
  }
};
