
import * as types from "./actionType";

const initialState = {
    subadminloginData: [],
    isLogin: false,
    isLoading: false,
    isError: false,
};

export const adminReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.ADMIN_LOGIN_SUCCESS:
            return {
                subadminloginData:payload,
                isLoading: false,
                isError: false,
                isLogin: true,

            };

        case types.ADMIN_LOGOUT_SUCCESS:
            return {
                subadminloginData: [],
                isLoading: false,
                isError: false,
                isLogin: false,
            };
        case types.ADMIN_LOGIN_REQUEST:
            return {
                ...state,

                isLoading: true,
                isError: false,
            };
        case types.ADMIN_LOGIN_FAILURE:
            return {
                ...state,

                isLoading: false,
                isError: true,
            };


        default:
            return state;
    }
};
