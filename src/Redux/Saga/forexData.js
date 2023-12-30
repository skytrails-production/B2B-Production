import { takeLatest, call, put } from "redux-saga/effects";
import userApi from "../API/api";
import { forexData } from "../Auth/forexData/actionForexData";
import { GET_FOREX_DATA } from "../Auth/forexData/actionType";
import { userData } from "../Auth/UserData/actionUserData";

function* getForexTableData() {
  try {
    const user = yield call(userApi.forexData,);
    yield put(forexData(user));
  } catch (error) {
    console.log(error);
  }
}
export function* userForexWatcher() {
  yield takeLatest(GET_FOREX_DATA, getForexTableData);
}
