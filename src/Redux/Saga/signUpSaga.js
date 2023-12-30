import { takeEvery, takeLatest, call, put } from "redux-saga/effects";
import userApi from "../API/api";
import { fetchSignUp, signUpAction } from "../Auth/SignUp/actionSignUp";
import { SIGNUP_REQUEST, SIGNUP_SUCCESS } from "../Auth/SignUp/actionType";

function* userSignUpRequest(action) {
  try {
    const user = yield call(userApi.userB2BRegistration, action.payload);
    yield put(fetchSignUp(user));
  } catch (error) {
    console.log(error);
  }
}
export function* signUpWatcher() {
  yield takeLatest(SIGNUP_REQUEST, userSignUpRequest);
}
