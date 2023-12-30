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
      };

    case types.ADMIN_AUTH_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    default:
      return state;
  }
};
