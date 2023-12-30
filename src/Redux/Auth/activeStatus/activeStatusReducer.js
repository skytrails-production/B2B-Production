import * as types from "./actionType";

const initialState = {
 activeStatusData : {},
 isLoading: false,

 isError: false,

 showSuccessMessage: false,
};

export const ActiveStatusReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.ACTIVE_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
      };

      case types.ACTIVE_STATUS_REQUEST:
      return {
        ...state,
        activeStatusData: payload,
        isLoading: false,
        isError: false,
        showSuccessMessage: true,
      };

    default:
      return state;
  }
};
