import { createReducer } from "redux-act";
import * as actions from "../auth/auth.actions";
import { addToLocalStorage } from "../../helpers/store";

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

	[actions.setUserSessionId]: (state, userSessionId) => {
		addToLocalStorage("userSessionId", userSessionId);

		return {
			...state,
			userSessionId
		};
	},
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

	[actions.confirmAgeSuccess]: (state) => ({
		...state,
		confirmAge: "success"
	}),
	[actions.logoutStore]: (state) => ({
		...state,
		user: null,
		userSessionId: "",
		userLoaded: false,
		userLoginStatus: "",
		confirmAge: "",
		userData: {},
	}),

};


export default createReducer(reducer, initialState);
