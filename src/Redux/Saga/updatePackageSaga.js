import { takeEvery, takeLatest, call, put } from "redux-saga/effects";
import userApi from "../API/api";
import { UPDATE_PACKAGE_REQUEST } from "../Auth/updatePackage/actionType";
import { VENDOR_AMOUNT_REQUEST } from "../Auth/VendorAmount/actionType";
import { vendorAmountData } from "../Auth/VendorAmount/vendorAmountData";

function* updatePackage(action) {
  try {
    const data = yield call(userApi.setVendorAmount, action.payload);
    yield put(vendorAmountData(data));
  } catch (error) {
    console.log(error);
  }
}
export function* updatePackageWatcher() {
  yield takeLatest(UPDATE_PACKAGE_REQUEST, updatePackage);
}
