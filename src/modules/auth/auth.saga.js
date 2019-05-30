import store from "store";
import history from "../../modules/history";
import api from "../../api";

import { addToLocalStorage, removeFromLocalStorage } from "../../helpers/store";

import * as  authAction from "../auth/auth.actions";

import { loader } from "../../components/Loader/Loader";
import customToastify from "../../helpers/customToastify";
import { takeEvery, put, select } from "redux-saga/effects";

const userSessionId = (state) => state.auth.userSessionId;


function* fetchGoogleData(data) {
	const { sessionId } = data.payload;

	const result = yield api.auth.v1Player(sessionId);

	loader.show();

	if (result.data.tos_agreed !== null) {
		yield put(authAction.setLoginData({
			userData: result.data,
			userLoaded: true,
			userLoginStatus: "success"
		}));

		addToLocalStorage("user", true);

		yield put(authAction.setCurrentUser());

		loader.hide();
		history.push(`/`);

		yield put(authAction.fetchBonus());
	} else {
		yield put(authAction.setLoginData({
			userData: result.data,
			userLoaded: true,
			userLoginStatus: "success"
		}));

		loader.hide();
	}
}

function* fetchConfirmUserAge(data) {
	const state = yield select();
	const { userSessionId } = state.auth;

	const result = yield api.auth.termsOfServiceConfirmAge(userSessionId, data.payload.data);

	yield put(authAction.confirmAgeSuccess());
}


function* fetchUserData() {
	loader.show();

	const sessionId = yield select(userSessionId);

	try {
		const result = yield api.auth.v1Player(sessionId);

		yield put(authAction.setLoginData({
			userData: result.data,
			userLoaded: true,
			userLoginStatus: "success"
		}));

		loader.hide();

		yield put(authAction.fetchBonus());
	} catch (e) {
		loader.hide();

		yield put(authAction.logoutStorePending());
	}
}

function* fetchUserName(data) {
	const sessionId = yield select(userSessionId);

	const result = yield api.auth.setUserName(sessionId, data.payload.screen_name);

	addToLocalStorage("user", true);
	addToLocalStorage("userSessionId", sessionId);

	yield put(authAction.setCurrentUser());
	history.push(`/`);
}

function* logoutUser() {
	loader.show();

	const sessionId = yield select(userSessionId);

	const result = yield api.auth.logoutUser(sessionId);
	removeFromLocalStorage("user");
	removeFromLocalStorage("userSessionId");

	yield put(authAction.logoutStore());
	history.push(`/`);

	loader.hide();
}

function * checkBonus() {
	const sessionId = yield select(userSessionId);

	const bonusResult = yield api.auth.returnBonus(sessionId);

	if (bonusResult.data.new_reward > 0) {
		customToastify(`You got new bonus ${bonusResult.data.new_reward}`, "success");
	}
}

function *initialize() {
	const user = store.get("user");
	if (user) {
		yield put(authAction.setCurrentUser());
		yield put(authAction.setUserSessionId(store.get("userSessionId")));

		loader.hide();
	}
}


export function* watchFetchUser() {
	yield takeEvery(authAction.googleLoginUserSaga, fetchGoogleData);
	yield takeEvery(authAction.confirmAgeSaga, fetchConfirmUserAge);
	yield takeEvery(authAction.getUserDataSaga, fetchUserData);
	yield takeEvery(authAction.initializeSaga, initialize);
	yield takeEvery(authAction.setLoginNameSaga, fetchUserName);
	yield takeEvery(authAction.logoutStorePending, logoutUser);
	yield takeEvery(authAction.fetchBonus, checkBonus);
}


