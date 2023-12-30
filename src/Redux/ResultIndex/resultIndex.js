import * as types from "./resultIndexType";

export const tokenAction = (data) => {
  return {
    type: types.RESULT_INDEX_REQUEST,
    payload: data,
  };
};
