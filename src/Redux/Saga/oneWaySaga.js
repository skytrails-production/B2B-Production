import { takeEvery, takeLatest, call, put } from "redux-saga/effects";
import userApi from "../API/api";
import { fetchOneWay } from "../FlightSearch/oneWay";
import { ONE_WAY_REQUEST } from "../FlightSearch/oneWayActionType";
import { fetchOneWayCombined } from "../FlightSearch/oneWay";
import { fetchOneWayFailedCombined } from "../FlightSearch/oneWay";
import {ONE_WAY_REQUEST_COMBINED} from "../FlightSearch/oneWayActionType";
function* oneWayRequest(action) {
  try {
    const data = yield call(userApi.oneWaySearch, action.payload);
    yield put(fetchOneWay(data));
    
  } catch (error) {
    console.log(error);
  }
}

function* oneWayRequestCombined(action) {
  try {
    const data = yield call(userApi.oneWaySearchCombined, action.payload);
    yield put(fetchOneWayCombined(data));
  } catch (error) {
    yield put(fetchOneWayFailedCombined())
    console.log(error);

  }
}
export function* oneWayWatcher() {
  yield takeLatest(ONE_WAY_REQUEST, oneWayRequest);
}

export function* oneWayWatcherCombined() {
  yield takeLatest(ONE_WAY_REQUEST_COMBINED, oneWayRequestCombined);
}