
import * as types from "./actionType";

const initialState = {
  vendorData : [],
  isLogin: false,
  isLoading: false,
  isError: false,
};

export const vendorReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.VENDOR_AMOUNT_SUCCESS:
      return {
        ...state,
        vendorData: payload,
        isLoading: false,
        isError: false,
      };

      case types.VENDOR_AMOUNT_REQUEST:
        return {
          ...state,
          vendorData: payload,
          isLoading: true,
          isError: false,
        };
   

    default:
      return state;
  }
};
