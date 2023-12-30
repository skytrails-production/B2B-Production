import * as types from "./actionType";

const initState = {
  packageBookingData: [],

  isLoading: false,

  isError: false,

  showSuccessMessage: false,
};

export const getPackageBookingReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.PACKAGE_BOOKING_SUCCESS:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case types.PACKAGE_BOOKING_REQUEST:
      return {
        ...state,
        packageBookingData: payload,
        isLoading: false,
        isError: false,
        showSuccessMessage: true,
      };

    default:
      return state;
  }
};
