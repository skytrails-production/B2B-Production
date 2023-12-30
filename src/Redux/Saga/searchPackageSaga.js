import { takeEvery, takeLatest, call, put } from "redux-saga/effects";
import userApi from "../API/api";
import { fetchActiveStatus } from "../Auth/activeStatus/actionActiveStatus";
import { ACTIVE_STATUS_REQUEST } from "../Auth/activeStatus/actionType";
import { markUpData } from "../Auth/markUp/actionMarkUp";
import { MARK_UP_REQUEST } from "../Auth/markUp/actionType";
import { fetchOneWay } from "../FlightSearch/OneWay/oneWay";
import { searchPackageData } from "../SearchPackage/actionSearchPackage";
import { GET_SEARCH_PACKAGE_DATA, SET_SEARCH_PACKAGE_DATA } from "../SearchPackage/actionType";

function* searchResult(action) {
  try {
    const data = yield call(userApi.searchPackage, action.payload);
    yield put(searchPackageData(data));
  } catch (error) {
    console.log(error);
  }
}
export function* searchResultWatcher() {
  yield takeLatest(GET_SEARCH_PACKAGE_DATA, searchResult);
}
