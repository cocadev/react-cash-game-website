/* eslint-disable no-unused-vars,import/no-duplicates */
import store from "store";
import history from "../../config/history";
import api from "../../api";

import { addToLocalStorage } from "../../customFunction/store";

import * as  authAction from "../auth/auth.actions";

import { takeEvery, put, select } from "redux-saga/effects";

const userSessionId = (state) => state.auth.userSessionId;


function* fetchGoogleData(data) {
	const { sessionId } = data.payload;
	try {
		const result = yield api.auth.v1Player(sessionId);

		if (result.data.tos_agreed !== null) {
			yield put(authAction.setLoginData({
				userData: result.data,
				userLoaded: true,
				userLoginStatus: "success"
			}));

			yield put(authAction.setCurrentUser());

			addToLocalStorage("user", true);
			addToLocalStorage("userSessionId", userSessionId);

			history.push(`/`);
		} else {
			yield put(authAction.setLoginData({
				userData: result.data,
				userLoaded: true,
				userLoginStatus: "success"
			}));
		}
	} catch (e) {
		console.log("fetchGoogleData", e);
	}
}

function* fetchConfirmUserAge(data) {
	const state = yield select();
	const { userSessionId } = state.auth;
	//TODO change
	//const result = yield api.auth.termsOfServiceConfirmAge(userSessionId, data.payload.data);
	yield put(authAction.setCurrentUser());

	addToLocalStorage("user", true);
	addToLocalStorage("userSessionId", userSessionId);

	history.push(`/`);
}


function* fetchUserData() {
	const sessionId = yield select(userSessionId);
	const result = yield api.auth.v1Player(sessionId);

	yield put(authAction.setLoginData({
		userData: result.data,
		userLoaded: true,
		userLoginStatus: "success"
	}));
}

function *initialize() {
	const user = store.get("user");
	if (user) {
		yield put(authAction.setCurrentUser());
		yield put(authAction.setUserSessionId(store.get("userSessionId")));
	}
}


export function* watchFetchUser() {
	yield takeEvery(authAction.googleLoginUserSaga, fetchGoogleData);
	yield takeEvery(authAction.confirmAgeSaga, fetchConfirmUserAge);
	yield takeEvery(authAction.getUserDataSaga, fetchUserData);
	yield takeEvery(authAction.initializeSaga, initialize);
}


