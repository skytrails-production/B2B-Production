import * as types from "./actionType";

export const getVisaData = (visaData) => {
  return {
    type: types.SET_VISA_DATA,
    payload: visaData,
  };
};

export const getVisaAction = () => {
    return {
      type: types.GET_VISA_DATA,
     
    };
  
};


