import { takeLatest, call, put } from "redux-saga/effects";
import userApi from "../API/api";
import { forexData } from "../Auth/forexData/actionForexData";
import { forex4CustomerData } from "../Auth/ForexData4Customer/actionForex4CustomerData";
import { GET_FOREX_4_CUSTOMER } from "../Auth/ForexData4Customer/actionType";
import { packageBooking } from "../HolidayBookingRequest/actionBooking";
import { PACKAGE_REQUEST, PACKAGE_SUCCESS } from "../HolidayBookingRequest/actionType";

function* getHolidayBooking(action) {
  try {
    const user = yield call(userApi.bookingHolidayRequest, action.payload);
    yield put(packageBooking(user));
  } catch (error) {
    console.log(error);
  }
}
export function* getHolidayBookingWatcher() {
  yield takeLatest(PACKAGE_REQUEST, getHolidayBooking);
}
