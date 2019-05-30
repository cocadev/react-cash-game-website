import { createAction } from "redux-act";

export const initializeSaga = createAction("init store");

export const setCurrentUser = createAction("set current user");
export const setUserSessionId = createAction("set user session id");

export const getUserDataSaga = createAction("get user data saga");

export const googleLoginUserSaga = createAction("google login user saga", (sessionId) => ({ sessionId }));

export const confirmAgeSaga = createAction("confirm age", (data) => ({ data }));
export const confirmAgeSuccess = createAction("confirm age success");

export const setLoginData = createAction("set login data");

export const setLoginNameSaga = createAction("set login name saga", (screen_name) => ({ screen_name }));
export const setLoginName = createAction("set login name");

export const logoutStore = createAction("logout / store");
export const logoutStorePending = createAction("logout pending");

export const fetchBonus = createAction("fetch bonus");


