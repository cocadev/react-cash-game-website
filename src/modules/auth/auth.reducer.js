import { createReducer } from "redux-act";
import * as actions from "../auth/auth.actions";

const initialState = {
	user: null,
	userSessionId: "",
	userLoaded: false,
	userLoginStatus: "",
	confirmAge: "",
	userData: {},
};

const reducer = {
	[actions.setCurrentUser]: (state) => ({
		...state,
		user: true
	}),

	[actions.setUserSessionId]: (state, userSessionId) => ({
		...state,
		userSessionId
	}),
	[actions.googleLoginUserSaga]: (state) => ({
		...state,
		userLoginStatus: "pending"
	}),

	[actions.setLoginData]: (state, data) => ({
		...state,
		userData: data.userData,
		userLoaded: data.userLoaded,
		userLoginStatus: data.userLoginStatus
	}),

	[actions.confirmAgeSaga]: (state) => ({
		...state,
		confirmAge: "pending"
	}),

};


export default createReducer(reducer, initialState);
