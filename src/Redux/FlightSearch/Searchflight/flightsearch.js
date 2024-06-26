import * as types from "./SearchActionType"

export const fetchSearch= (data) => {
    return {
      type: types.SEARCH,
      payload: data,    
    };
  };

  // export const oneWayEMTAction = (data) => {
  //   if (data) {
  //     return {
  //       type: types.ONE_WAY_REQUEST,
  //       payload: data,
  //     };
  //   }
  // };
  
  export const clearSearch = () => {
    return {
      type: types.CLEAR,
    };
  };