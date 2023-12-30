import { takeLatest, call, put } from "redux-saga/effects";
import userApi from "../API/api";
import { forexData } from "../Auth/forexData/actionForexData";
import { forex4CustomerData } from "../Auth/ForexData4Customer/actionForex4CustomerData";
import { GET_FOREX_4_CUSTOMER } from "../Auth/ForexData4Customer/actionType";

function* getForexTableData4Customer() {
  try {
    const user = yield call(userApi.forexCustomerData,);
    yield put(forex4CustomerData(user));
  } catch (error) {
    console.log(error);
  }
}
export function* getForex4CustomerWatcher() {
  yield takeLatest(GET_FOREX_4_CUSTOMER, getForexTableData4Customer);
}
