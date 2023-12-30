import { takeEvery, takeLatest, call, put } from "redux-saga/effects";
import userApi from "../API/api";
import { createPackage } from "../CreatePackage/actionCreatePackage";
import { CREATE_PACKAGE_REQUEST } from "../CreatePackage/actionType";

function* createPackageRequest(action) {
  try {
    const user = yield call(userApi.createPackage, action.payload);
    yield put(createPackage(user));
  } catch (error) {
    console.log(error);
  }
}
export function* createPackageWatcher() {
  yield takeLatest(CREATE_PACKAGE_REQUEST, createPackageRequest);
}
