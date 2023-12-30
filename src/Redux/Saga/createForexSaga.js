import { takeEvery, takeLatest, call, put } from "redux-saga/effects";
import userApi from "../API/api";
import { CREATE_FOREX_REQUEST } from "../CreateForxWithMe/actionType";
import { createForex } from "../CreateForxWithMe/actionCreateForex";

function* createForexRequest(action) {
  try {
    const user = yield call(userApi.createForex, action.payload);
    yield put(createForex(user));
  } catch (error) {
    console.log(error);
  }
}
export function* createForexWatcher() {
  yield takeLatest(CREATE_FOREX_REQUEST, createForexRequest);
}
