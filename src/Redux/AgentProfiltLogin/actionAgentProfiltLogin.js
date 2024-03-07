import * as types from "./actionType";

export const Agent_ProfileLogin = (data) => {
    return {
        type: types.AGENT_PROFILE_LOGIN_SUCCESS,
        payload: data,
    };
};

export const Agent_ProfileRequest = (user) => {
    if (user) {
        return {
          type: types.AGENT_PROFILE_LOGIN_REQUEST,
          payload: user,
        };
      }

};
export const Agent_ProfileLogout = () => {

    return {
        type: types.AGENT_PROFILE_LOGOUT_SUCCESS,

    };

};


export const Agent_ProfileFailure = () => {

    return {
        type: types.AGENT_PROFILE_LOGIN_FAILURE,

    };

};