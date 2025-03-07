import { takeEvery, takeLatest, call, put } from "redux-saga/effects";
import userApi from "../API/api";
import { fetchOneWay } from "../FlightSearch/OneWay/oneWay";
import { ONE_WAY_REQUEST } from "../FlightSearch/OneWay/oneWayActionType";

function* oneWayRequest(action) {
  try {
    const data = yield call(userApi.oneWaySearch, action.payload);
    yield put(fetchOneWay(data));
    
  } catch (error) {
    console.log(error);
  }
}
export function* oneWayWatcher() {
  yield takeLatest(ONE_WAY_REQUEST, oneWayRequest);
}
