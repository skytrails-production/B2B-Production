import { takeLatest, call, put } from "redux-saga/effects";
import userApi from "../API/api";
import { PACKAGE_BOOKING_REQUEST } from "../getHolidayBooking/actionType";

function* getHolidayBook() {
  try {
    const user = yield call(userApi.bookingHoliday,);
    // yield put(getPackageBooking(user));
  } catch (error) {
    console.log(error);
  }
}
export function* getHolidayBookingWatcher() {
  yield takeLatest(PACKAGE_BOOKING_REQUEST, getHolidayBook);
}
