import { markUpData } from "./actionMarkUp";
import * as types from "./actionType";

const initialState = {
  markupData :{},
  isLogin: false,
  isLoading: false,
  isError: false,
};

export const MarkUpReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.MARK_UP_SUCCESS:
      return {
        ...state,
        markupData: payload,
        isLoading: false,
        isError: false,
      };

      case types.MARK_UP_REQUEST:
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
   

    default:
      return state;
  }
};
