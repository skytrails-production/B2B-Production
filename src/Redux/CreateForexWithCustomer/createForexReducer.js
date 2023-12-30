import * as types from "./actionType";

const initState = {
  createForexData4Customer: [],

  isLoading: false,

  isError: false,

  showSuccessMessage: false,
};

export const createForex4CustomerReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_FOREX_WITH_CUSTOMER_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case types.CREATE_FOREX_WITH_CUSTOMER_SUCCESS:
      return {
        ...state,
        createForexData4Customer: payload,
        isLoading: false,
        isError: false,
        showSuccessMessage: true,
      };

    default:
      return state;
  }
};
