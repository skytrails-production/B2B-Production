import {
    FETCH_CITYNAME_CLEAR,
    FETCH_CITYNAME_SUCCESS,
    FETCH_CITYNAME_REQUEST,
} from './CitynameActionType';

export const fetchCitynameRequest = () => ({
    type: FETCH_CITYNAME_REQUEST
});


export const fetchCitynameSuccess= (data) => {
    return {
      type: FETCH_CITYNAME_SUCCESS,
      payload: data,    
    };
  };

  
  export const clearSearchcity = () => {
    return {
      type: FETCH_CITYNAME_CLEAR,
    };
  };
