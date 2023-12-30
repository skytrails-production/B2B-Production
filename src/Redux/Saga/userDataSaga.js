import { takeLatest, call, put } from "redux-saga/effects";
import userApi from "../API/api";
import { GET_USERDATA } from "../Auth/UserDataById/actionType";
import { userData } from "../Auth/UserDataById/actionUserData";

function* getUserData(action) {
  // console.log(action,"action")
  try {
    const user = yield call(userApi.UserDetail,action.payload);
    // console.log(user,"userrr")
    yield put(userData(user));
  } catch (error) {
    // console.log(error,"myerror");
  }
}
export function* userDataWatcher() {
  yield takeLatest(GET_USERDATA, getUserData);
}
