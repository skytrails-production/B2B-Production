import { takeLatest, call, put } from "redux-saga/effects";
import userApi from "../API/api";
import { getVisaData } from "../getVisa/actionVisaData";
import { GET_VISA_DATA } from "../getVisa/actionType";

function* getVisaTableData() {
  try {
    const user = yield call(userApi.visaData);
    yield put(getVisaData(user));
  } catch (error) {
    console.log(error);
  }
}
export function* userVisaWatcher() {
  yield takeLatest(GET_VISA_DATA, getVisaTableData);
}
