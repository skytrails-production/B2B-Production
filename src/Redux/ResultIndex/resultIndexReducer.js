import * as types from "./resultIndexType";

const initState = {
  resultIndexData: {},
};

export const ipReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.RESULT_INDEX_REQUEST:
      return {
        ...state,
        resultIndexData: payload,
      };

    default:
      return state;
  }
};
