import { takeEvery, takeLatest, call, put } from "redux-saga/effects";
import userApi from "../API/api";
import { fetchActiveStatus } from "../Auth/activeStatus/actionActiveStatus";
import { ACTIVE_STATUS_REQUEST } from "../Auth/activeStatus/actionType";
import { fetchOneWay } from "../FlightSearch/OneWay/oneWay";

function* getActiveStatus(action) {
  try {
    const data = yield call(userApi.activeStatus, action.payload);
    yield put(fetchActiveStatus(data));
  } catch (error) {
    console.log(error);
  }
}
export function* activeSegaWatcher() {
  yield takeLatest(ACTIVE_STATUS_REQUEST, getActiveStatus);
}
