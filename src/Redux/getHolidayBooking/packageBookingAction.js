import * as types from "./actionType";

export const getPackageBooking = (user) => {
  return {
    type: types.PACKAGE_BOOKING_SUCCESS,
    payload: user,
  };
};

export const getPackageBookingAction = (user) => {
  if (user) {
    // console.log("data",user);
    return {
      type: types.PACKAGE_BOOKING_REQUEST,
      payload: user,
    };
  }
};
