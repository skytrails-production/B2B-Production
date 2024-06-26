// actions.js
import {
    FETCH_FLIGHTNAME_REQUEST,
    FETCH_FLIGHTNAME_SUCCESS,
    FETCH_FLIGHTNAME_CLEAR,
    FETCH_FLIGHTNAME_FAILURE
} from './AirlinenameActionType';

export const fetchFlightnameRequest = () => ({
    type: FETCH_FLIGHTNAME_REQUEST
});


export const fetchFlightnameSuccess= (data) => {
    return {
      type: FETCH_FLIGHTNAME_SUCCESS,
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
  
  export const clearSearch1 = () => {
    return {
      type: FETCH_FLIGHTNAME_CLEAR,
    };
  };
