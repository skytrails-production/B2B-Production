import { takeLatest, call, put } from "redux-saga/effects";
import userApi from "../API/api";
import { GET_USER_DATA } from "../Auth/UserData/actionType";
import { userData } from "../Auth/UserData/actionUserData";

function* getUserTableData() {
  try {
    const user = yield call(userApi.usersTableData);
    yield put(userData(user));
  } catch (error) {
    console.log(error);
  }
}
export function* userDataTableWatcher() {
  yield takeLatest(GET_USER_DATA, getUserTableData);
}
