// reducer.js
import {
    FETCH_CITYNAME_CLEAR,
    FETCH_CITYNAME_SUCCESS,
    FETCH_CITYNAME_REQUEST
} from './CitynameActionType';

const initialState = {
    data: [],
    
  isLoading: false,

  isError: false,

  showSuccessMessage: false,
};

const CitynameReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CITYNAME_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FETCH_CITYNAME_SUCCESS:
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

     case FETCH_CITYNAME_CLEAR:
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

export default CitynameReducer;
