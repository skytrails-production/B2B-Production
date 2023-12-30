import { takeEvery, takeLatest, call, put } from "redux-saga/effects";
import userApi from "../API/api";
import { VENDOR_AMOUNT_REQUEST } from "../Auth/VendorAmount/actionType";
import { vendorAmountData } from "../Auth/VendorAmount/vendorAmountData";

function* vendorAdd(action) {
  try {
    const data = yield call(userApi.setVendorAmount, action.payload);
    yield put(vendorAmountData(data));
  } catch (error) {
    console.log(error);
  }
}
export function* vendorWatcher() {
  yield takeLatest(VENDOR_AMOUNT_REQUEST, vendorAdd);
}
