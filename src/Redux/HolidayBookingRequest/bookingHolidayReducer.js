import * as types from "./actionType";
const initState = {
  packageRequestData: [],
  isLoading: false,
  isError: false,
  showSuccessMessage: false,
};
export const packageBookingReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.PACKAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
      };

    case types.PACKAGE_REQUEST:
      return {
        ...state,
        packageRequestData: payload,
        isLoading: true,
        isError: false,
        showSuccessMessage: true,
      };
    case types.PACKAGE_FAILURE:
      return {
        ...state,
        packageRequestData: payload,
        isLoading: false,
        isError: true,
        showSuccessMessage: false,
      };
    case types.PACKAGE_CLEAR:
      return {
        packageRequestData: [],
        isLoading: false,
        isError: false,
        showSuccessMessage: false,
      }

    default:
      return state;
  }
};
