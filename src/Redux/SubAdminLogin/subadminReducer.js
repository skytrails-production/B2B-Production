
import * as types from "./actionType";

const initialState = {
    subadminloginData: [],
    isLogin: false,
    isLoading: false,
    isError: false,
};

export const subadminReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.LOGIN_SUCCESS:
            return {
                subadminloginData:payload,
                isLoading: false,
                isError: false,
            };

        case types.LOGOUT_SUCCESS:
            return {
                subadminloginData: [],
                isLoading: false,
                isError: false,
            };
        case types.LOGIN_REQUEST:
            return {
                ...state,

                isLoading: true,
                isError: false,
            };
        case types.LOGIN_FAILURE:
            return {
                ...state,

                isLoading: false,
                isError: true,
            };


        default:
            return state;
    }
};
