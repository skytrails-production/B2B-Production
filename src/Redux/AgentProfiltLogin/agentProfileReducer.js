
import * as types from "./actionType";

const initialState = {
    agentProfileloginData: [],
    isLogin: false,
    isLoading: false,
    isError: false,
};

export const agentProfileReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.AGENT_PROFILE_LOGIN_SUCCESS:
            return {
                agentProfileloginData: payload,
                isLoading: false,
                isError: false,
                isLogin: true,

            };

        case types.AGENT_PROFILE_LOGOUT_SUCCESS:
            return {
                agentProfileloginData: [],
                isLoading: false,
                isError: false,
                isLogin: false,
            };
        case types.AGENT_PROFILE_LOGIN_REQUEST:
            return {
                ...state,

                isLoading: true,
                isError: false,
            };
        case types.AGENT_PROFILE_LOGIN_FAILURE:
            return {
                ...state,
                isLogin: false,
                isLoading: false,
                isError: true,
            };


        default:
            return state;
    }
};
