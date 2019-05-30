import { createAction } from "redux-act";

export const setCurrentUser = createAction("set current user");
export const setUserSessionId = createAction("set user session id");

// user
export const googleLoginUserSaga = createAction("google login user saga", (sessionId) => ({ sessionId }));

export const confirmAgeSaga = createAction("confirm age", (data) => ({ data }));

export const confirmAgeSucces = createAction("confirm age success");

export const setLoginData = createAction("set login data ");

