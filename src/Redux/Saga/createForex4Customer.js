import { takeEvery, takeLatest, call, put } from "redux-saga/effects";
import userApi from "../API/api";
import { CREATE_FOREX_WITH_CUSTOMER_REQUEST } from "../CreateForexWithCustomer/actionType";
import { createForex4Customer } from "../CreateForexWithCustomer/actionCreateForex";

function* createForex4CustomerRequest(action) {
  try {
    const user = yield call(userApi.createForexForCustomer, action.payload);
    yield put(createForex4Customer(user));
  } catch (error) {
    console.log(error);
  }
}
export function* createForex4CustomerWatcher() {
  yield takeLatest(CREATE_FOREX_WITH_CUSTOMER_REQUEST, createForex4CustomerRequest);
}
