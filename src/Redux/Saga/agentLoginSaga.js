import { takeEvery, call, put, takeLatest } from "redux-saga/effects";
import { AGENT_PROFILE_LOGIN_REQUEST, AGENT_PROFILE_LOGIN_SUCCESS } from "../AgentProfiltLogin/actionType"
import userApi from "../API/api";
import {
    Agent_ProfileLogin,
    Agent_ProfileFailure,


} from "../AgentProfiltLogin/actionAgentProfiltLogin";

function* userLoginRequest(action) {
    try {
        const user = yield call(userApi.agentProfileLogin, action.payload);
        yield put(Agent_ProfileLogin(user));
        // console.log("hshshsh", fetchLogIn(user))
    } catch (error) {
        yield put(Agent_ProfileFailure({ error: true, errormessage: error }));
    }
}

export function* agentProfileWatcher() {
    yield takeLatest(AGENT_PROFILE_LOGIN_REQUEST, userLoginRequest);
}