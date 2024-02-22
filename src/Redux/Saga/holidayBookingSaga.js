import { takeLatest, call, put } from "redux-saga/effects";
import userApi from "../API/api";
import {
  getPackageBooking,
  openSuccessModal,
  packageBooking,
} from "../HolidayBook/actionBooking";
import { PACKAGE_BOOK_REQUEST } from "../HolidayBook/actionType";
import { OPEN_SUCCESS_MODAL } from "../HolidayBook/actionType";
import { packageBookingActionError } from "../HolidayBookingRequest/actionBooking";
function* getHolidayBooking(action) {
  try {
    const user = yield call(userApi.bookingHoliday, action.payload);
    yield put(getPackageBooking(user));
    console.log("Check Response", user);
    if (user.status === 200) {
      alert(user.status)
      yield put(openSuccessModal());
      yield put(PACKAGE_SUCCESS());
      
    }
    else {
      yield (packageBookingActionError());
      alert(error)
      console.log(error)
    }
  } catch (error) {
    yield (packageBookingActionError());
    console.log(error);
    alert(error);
  }
}
export function* getHolidayBookingWatcher() {
  yield takeLatest(PACKAGE_BOOK_REQUEST, getHolidayBooking);
}
