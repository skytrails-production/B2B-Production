import { takeLatest, call, put } from "redux-saga/effects";
import userApi from "../API/api";
import { fetchAdminAuth } from "../Auth/AdminAuth/actionAdminAuth";
import { ADMIN_AUTH_REQUEST } from "../Auth/AdminAuth/actionType";

function* getAdminAuth(action) {
  try {
    const user = yield call(userApi.adminAuth, action.payload);
    yield put(fetchAdminAuth(user));
  } catch (error) {
    console.log(error);
  }
}
export function* getAdminWatcher() {
  yield takeLatest(ADMIN_AUTH_REQUEST, getAdminAuth);
}
