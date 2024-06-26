import * as types from "./SearchActionType";

const initState = {
  search: [],

  isLoading: false,

  isError: false,

  showSuccessMessage: false,
};

export const searchReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.SEARCH:
      return {
        ...state,
        search: payload,
        isLoading: true,
        isError: false,
      };

    case types.CLEAR:
      return {
        search: [],

        isLoading: false,

        isError: false,

        showSuccessMessage: false,
      };

    default:
      return state;
  }
};
