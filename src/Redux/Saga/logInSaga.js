import { takeEvery, call, put, takeLatest } from "redux-saga/effects";
import { LOGIN_REQUEST, LOGIN_SUCCESS } from "../Auth/logIn/actionType";
import userApi from "../API/api";
import {
  fetchLogIn,
  loginAction,
  userLogInAction,
} from "../Auth/logIn/actionLogin";

function* userLoginRequest(action) {
  try {
    const user = yield call(userApi.userB2BLogin, action.payload);
    yield put(fetchLogIn(user));
    console.log("hshshsh", fetchLogIn(user))
  } catch (error) {
    yield put(fetchLogIn({error:true}));
  }
}

export function* loginWatcher() {
  yield takeLatest(LOGIN_REQUEST, userLoginRequest);
}
