
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
        case types.SUBADMIN_LOGIN_SUCCESS:
            return {
                subadminloginData:payload,
                isLoading: false,
                isError: false,
                isLogin: true,
            };

        case types.SUBADMIN_LOGOUT_SUCCESS:
            return {
                subadminloginData: [],
                isLoading: false,
                isError: false,
                isLogin: false,
            };
        case types.SUBADMIN_LOGIN_REQUEST:
            return {
                ...state,

                isLoading: true,
                isError: false,
            };
        case types.SUBADMIN_LOGIN_FAILURE:
            return {
                ...state,

                isLoading: false,
                isError: true,
            };


        default:
            return state;
    }
};
