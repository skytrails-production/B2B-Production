import { takeEvery, takeLatest, call, put } from "redux-saga/effects";
import userApi from "../API/api";
import { fetchSignUp, signUpAction, signUpFail } from "../Auth/SignUp/actionSignUp";
import { SIGNUP_REQUEST, SIGNUP_SUCCESS, ONBORDING_REQUEST } from "../Auth/SignUp/actionType";

function* userSignUpRequest(action) {
  let user;
  try {
    user = yield call(userApi.userB2BRegistration, action.payload);
    yield put(fetchSignUp(user));
  } catch (error) {
    console.log(error);
    yield put(signUpFail(error));
  }
}
function* onbordingRequest(action) {
  try {
    const user = yield call(userApi.userB2BOnbording, action.payload)
    // console.warn("onbording",user)
    yield put(fetchSignUp(user));

  } catch (error) {
    console.log(error, "onbording")
  }
}
export function* signUpWatcher() {
  yield takeLatest(SIGNUP_REQUEST, userSignUpRequest);
}
export function* onbordingWatcher() {
  yield takeLatest(ONBORDING_REQUEST, onbordingRequest)
}
