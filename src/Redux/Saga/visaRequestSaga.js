import { takeLatest, call, put } from "redux-saga/effects";
import userApi from "../API/api";
import { VISA_REQUEST, VISA_SUCCESS } from "../visaRequest/actionType";
import { createVisaRequest } from "../visaRequest/actionVisaRequest";

function* getVisaRequest(action) {
  try {
    const user = yield call(userApi.visaRequest,action.payload);
    yield put( createVisaRequest(user));
  } catch (error) {
    console.log(error);
  }
}
export function* getVisaRequestWatcher() {
  yield takeLatest(VISA_REQUEST, getVisaRequest);
}
