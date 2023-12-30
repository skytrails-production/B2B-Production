import { takeEvery, takeLatest, call, put } from "redux-saga/effects";
import userApi from "../API/api";
import { fetchActiveStatus } from "../Auth/activeStatus/actionActiveStatus";
import { ACTIVE_STATUS_REQUEST } from "../Auth/activeStatus/actionType";
import { markUpData } from "../Auth/markUp/actionMarkUp";
import { MARK_UP_REQUEST } from "../Auth/markUp/actionType";
import { fetchOneWay } from "../FlightSearch/OneWay/oneWay";

function* markUpAdd(action) {
  try {
    const data = yield call(userApi.markUpStatus, action.payload);
    yield put(markUpData(data));
  } catch (error) {
    console.log(error);
  }
}
export function* markUpWatcher() {
  yield takeLatest(MARK_UP_REQUEST, markUpAdd);
}
