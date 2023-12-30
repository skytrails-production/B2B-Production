import { takeLatest, call, put } from "redux-saga/effects";
import userApi from "../API/api";
import { fetchAdminAuth } from "../Auth/AdminAuth/actionAdminAuth";
import { ADMIN_AUTH_REQUEST } from "../Auth/AdminAuth/actionType";
import { ADMIN_SIGN_OUT_REQUEST } from "../Auth/AdminSignOut/actionType";
import { fetchSignUp, signUpAction } from "../Auth/SignUp/actionSignUp";
import { SIGNUP_REQUEST, SIGNUP_SUCCESS } from "../Auth/SignUp/actionType";
import { GET_USER_DATA, SET_USER_DATA } from "../Auth/UserData/actionType";
import { userData } from "../Auth/UserData/actionUserData";

function* signOutAdminAuth(action) {
  try {
    const user = yield call(userApi.adminSignOut, action.payload);
    yield put(adminSingOut(user));
  } catch (error) {
    console.log(error);
  }
}
export function* getAdminWatcher() {
  yield takeLatest(ADMIN_SIGN_OUT_REQUEST, signOutAdminAuth);
}
