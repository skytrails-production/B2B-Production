import { takeEvery, takeLatest, call, put } from "redux-saga/effects";
import userApi from "../API/api";
import {balanceSubtractRequest, balanceSubtractSuccess, balanceSubtractFailure } from "../Auth/balaceSubtract/actionBalnceSubtract";
import { BALANCE_SUBTRACT_REQUEST, BALANCE_SUBTRACT_SUCCESS, BALANCE_SUBTRACT_FAILURE } from "../Auth/balaceSubtract/actionType";

function* callBalanceSubtractApi(action) {
    try {
      // Call the API function
      const response = yield call(userApi.balanceSubtract, action.payload);
  
      // Dispatch a success action with the response data
      yield put(balanceSubtractSuccess(response.data));
    } catch (error) {
      // Dispatch a failure action if there's an error
      yield put(balanceSubtractFailure(error));
    }
  }
  
  // Watcher Saga: Listens for BALANCE_SUBTRACT_REQUEST and triggers the API call
  export function* balanceSubtractWatcher() {
    yield takeLatest(BALANCE_SUBTRACT_REQUEST, callBalanceSubtractApi);
  }