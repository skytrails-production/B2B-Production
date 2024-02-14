import { takeLatest, put } from "redux-saga/effects";

function* saveFormData(action) {
  // You can save the form data to your backend or any other storage here
  // For demonstration purposes, we'll just log the data
  // console.log("Form Data:", action);
  // You can dispatch additional actions here if needed
}

export function* watchFormSubmission() {
  yield takeLatest("SUBMIT_FORM", saveFormData);
}
