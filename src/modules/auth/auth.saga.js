/* eslint-disable no-unused-vars,import/no-duplicates */
import history from "../../config/history";
import api from "../../api";

import * as  authAction from "../auth/auth.actions";

import { takeEvery, put, select } from "redux-saga/effects";


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


	const result = yield api.auth.termsOfServiceConfirmAge(userSessionId, data.payload.data);

	//TODO change
	yield put(authAction.setCurrentUser());

	history.push(`/`);
}


export function* watchFetchUser() {
	yield takeEvery(authAction.googleLoginUserSaga, fetchGoogleData);
	yield takeEvery(authAction.confirmAgeSaga, fetchConfirmUserAge);
}


