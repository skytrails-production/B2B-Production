
import * as types from "./actionType";

const initialState = {
  updatePackage : [],
  isLogin: false,
  isLoading: false,
  isError: false,
};

export const updatePackageReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.UPDATE_PACKAGE_SUCCESS:
      return {
        ...state,
        updatePackage: payload,
        isLoading: false,
        isError: false,
      };

      case types.UPDATE_PACKAGE_REQUEST:
        return {
          ...state,
          updatePackage: payload,
          isLoading: true,
          isError: false,
        };
   

    default:
      return state;
  }
};
