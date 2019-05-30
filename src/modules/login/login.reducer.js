import { createReducer } from "redux-act";

import * as actions from "./login.actions";


const initialState = {
	userLoaded: false,
	userLoginStatus: "",
	userData: {},
};

const reducer = {
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
};


export default createReducer(reducer, initialState);
