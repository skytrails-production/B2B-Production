import { takeLatest, call, put } from "redux-saga/effects";
import userApi from "../API/api";
import { packageBooking, packageBookingActionError } from "../HolidayBookingRequest/actionBooking";
import { PACKAGE_REQUEST } from "../HolidayBookingRequest/actionType";
import Swal from "sweetalert2";

function* getHolidayBookRequest(action) {
  try {
    const user = yield call(userApi.bookingHolidayRequest, action.payload);
   
    yield put(packageBooking(user));
    Swal.fire({
      icon: 'success',
      title: 'Package Booking Sucessfull',
      text: "Sucessfull",
      timer: 3000


    })
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Somthing went wrong',
      text: error,
      timer: 3000


    })
    yield put(packageBookingActionError())
    
   

  }
}
export function* getHolidayBookingRequestWatcher() {
  yield takeLatest(PACKAGE_REQUEST, getHolidayBookRequest);
}
