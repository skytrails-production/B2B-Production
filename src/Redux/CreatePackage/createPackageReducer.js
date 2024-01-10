import * as types from "./actionType";

const initState = {
  createPackageData: [],

  isLoading: false,

  isError: false,

  showSuccessMessage: false,
};

export const createPackageReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_PACKAGE_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case types.CREATE_PACKAGE_SUCCESS:
      return {
        ...state,
        createPackageData: payload,
        isLoading: false,
        isError: false,
        showSuccessMessage: true,
      };
    case types.CREATE_PACKAGE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        showSuccessMessage: true,
      };
    case types.CLEAR_PACKAGE_REDUCER:
      return initState;
       

    default:
      return state;
  }
};
