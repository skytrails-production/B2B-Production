import * as types from "./actionType";

const initState = {
  createForexData: [],

  isLoading: false,

  isError: false,

  showSuccessMessage: false,
};

export const createForexReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_FOREX_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case types.CREATE_FOREX_SUCCESS:
      return {
        ...state,
        createForexData: payload,
        isLoading: false,
        isError: false,
        showSuccessMessage: true,
      };

    default:
      return state;
  }
};
