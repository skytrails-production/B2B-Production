import { takeEvery, call, put, takeLatest } from "redux-saga/effects";
import { LOGIN_REQUEST, LOGIN_SUCCESS } from "../Auth/logIn/actionType";
import userApi from "../API/api";
import {
  fetchLogIn,
  loginAction,
  userLogInAction,
  loginFaliAction
} from "../Auth/logIn/actionLogin";

function* userLoginRequest(action) {
  try {
    const user = yield call(userApi.userB2BLogin, action.payload);
    console.log(user);
    yield put(fetchLogIn(user));
    console.log("hshshsh", user)
  } catch (error) {
    yield put(loginFaliAction({error:true,errormessage:error}));
  }
}

export function* loginWatcher() {
  yield takeLatest(LOGIN_REQUEST, userLoginRequest);
}
