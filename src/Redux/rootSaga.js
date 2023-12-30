import { all } from "redux-saga/effects";

import { loginWatcher } from "./Saga/logInSaga";
import { signUpWatcher } from "./Saga/signUpSaga";
import { ipWatcher } from "./Saga/ipSaga";
import { oneWayWatcher } from "./Saga/oneWaySaga";
import { returnWatcher } from "./Saga/returnSaga";
import { oneWayEMTWatcher } from "./Saga/oneWayEMTSaga";
import { flightFareWatcher } from "./Saga/flightFareSaga";
import { flightBookWatcher } from "./Saga/flightBookSaga";
import { userDataTableWatcher } from "./Saga/userSaga";
import { passengersWatcher } from "./Saga/passengersDetailSaga";
import { getAdminWatcher } from "./Saga/adminAuth";
import { activeSegaWatcher } from "./Saga/activeStatusSega";
import { markUpWatcher } from "./Saga/markUpSaga";
import { vendorWatcher } from "./Saga/vandorSaga";
import { createPackageWatcher } from "./Saga/createPackageSaga";
import { searchResultWatcher } from "./Saga/searchPackageSaga";
import { searchOneResultWatcher } from "./Saga/searchOnePackageSaga";
import { updatePackageWatcher } from "./Saga/updatePackageSaga";
import { createForexWatcher } from "./Saga/createForexSaga";
import { createForex4CustomerWatcher } from "./Saga/createForex4Customer";
import { getForex4CustomerWatcher } from "./Saga/forexData4Customer";
import { userForexWatcher } from "./Saga/forexData";
import { busSearchWatcher } from "./Saga/busSearch";
import { getVisaRequestWatcher } from "./Saga/visaRequestSaga";
import { userVisaWatcher } from "./Saga/visaDataSaga";
import { getHolidayBookingWatcher } from "./Saga/packageBookingSaga";
import { hotelSearchWatcher } from "./Saga/hotelSaga";
import { watchFormSubmission } from "./Saga/HolidayPackageTravellerDetailsSaga";
import { getHolidayBookingRequestWatcher } from "./Saga/packageBookingRequestSaga";
import { userDataWatcher } from "./Saga/userDataSaga";
import { balanceSubtractWatcher } from "./Saga/balanceSubtractSaga";

export function* rootSaga() {
  yield all([
    loginWatcher(),
    signUpWatcher(),
    ipWatcher(),
    oneWayWatcher(),
    returnWatcher(),
    passengersWatcher(),
    oneWayEMTWatcher(),
    flightFareWatcher(),
    flightBookWatcher(),
    userDataTableWatcher(),
    getAdminWatcher(),
    getAdminWatcher(),
    activeSegaWatcher(),
    markUpWatcher(),
    vendorWatcher(),
    createPackageWatcher(),
    searchResultWatcher(),
    searchOneResultWatcher(),
    updatePackageWatcher(),
    getHolidayBookingRequestWatcher(),
    createForexWatcher(),
    createForex4CustomerWatcher(),
    createForexWatcher(),
    getForex4CustomerWatcher(),
    userForexWatcher(),
    busSearchWatcher(),
    getVisaRequestWatcher(),
    userVisaWatcher(),
    getHolidayBookingWatcher(),
    hotelSearchWatcher(),
    getHolidayBookingWatcher(),
    watchFormSubmission(),
    userDataWatcher(),
    balanceSubtractWatcher()
  ]);
}
