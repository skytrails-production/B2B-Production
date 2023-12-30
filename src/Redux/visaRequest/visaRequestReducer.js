import * as types from "./actionType";

const initState = {
  visaData: [],

  isLoading: false,

  isError: false,

  showSuccessMessage: false,
};

export const visaRequestReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.VISA_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case types.VISA_SUCCESS:
      return {
        ...state,
        visaData: payload,
        isLoading: false,
        isError: false,
        showSuccessMessage: true,
      };

    default:
      return state;
  }
};
