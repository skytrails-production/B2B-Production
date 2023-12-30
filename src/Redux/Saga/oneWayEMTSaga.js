import { takeEvery, takeLatest, call, put } from "redux-saga/effects";
import userApi from "../API/api";
import { fetchOneWayEMT } from "../FlightSearch/OneWayEMT/oneWayEMT";
import { ONE_WAY_EMT_REQUEST } from "../FlightSearch/OneWayEMT/oneWayEMTActionType";

function* oneWayEMTRequest(action) {
  try {
    const data = yield call(userApi.oneWayEMTSearch, action.payload);
    yield put(fetchOneWayEMT(data));
  } catch (error) {
    console.log(error);
  }
}
export function* oneWayEMTWatcher() {
  yield takeLatest(ONE_WAY_EMT_REQUEST, oneWayEMTRequest);
}
