// reducer.js
import {
    FETCH_FLIGHTNAME_REQUEST,
    FETCH_FLIGHTNAME_SUCCESS,
    FETCH_FLIGHTNAME_CLEAR,
    FETCH_FLIGHTNAME_FAILURE
} from './AirlinenameActionType';

const initialState = {
    data: [],
    
  isLoading: false,

  isError: false,

  showSuccessMessage: false,
};

const flightnameReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FLIGHTNAME_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_FLIGHTNAME_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: ''
            };
        // case FETCH_FLIGHTNAME_FAILURE:
        //     return {
        //         ...state,
        //         loading: false,
        //         data: [],
        //         error: action.payload
        //     };

     case FETCH_FLIGHTNAME_CLEAR:
      return {
        data: [],

        isLoading: false,

        isError: false,

        showSuccessMessage: false,
      };
        default:
            return state;
    }
};

export default flightnameReducer;
