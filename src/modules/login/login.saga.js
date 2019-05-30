/* eslint-disable no-unused-vars,import/no-duplicates */
import history from "../../config/history";

import * as  authAction from "../auth/auth.actions";
import * as loginAction from "./login.actions";

import { takeEvery, put, select } from "redux-saga/effects";


const defaultData = {
	"FUN_balance": 1000.0,
	"game_auth": "f2b95cbf-a55f-4ef3-acaa-af59fb258460",
	"invite_code": "c203d3af-1d64-48fb-8df9-4aeea23bb23a",
	"id": "f2276b46-571d-4293-9c56-b045e3dac242",
	"is_adult": false,
	"screen_name": "",
	"locale": "",
	"tos_agreed": 1,
	"family_name": "",
	"full_name": "",
	"age_check": false,
	"given_name": "",
	"free_spins": {},
	"loot": [],
	"picture": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50"
};
function* fetchGoogleData(data) {
	if (defaultData.tos_agreed !== null) {
		yield put(loginAction.setLoginData({
			userData: defaultData,
			userLoaded: true,
			userLoginStatus: "success"
		}));

		yield put(authAction.setCurrentUser());

		history.push(`/`);
	} else {
		yield put(loginAction.setLoginData({
			userData: defaultData,
			userLoaded: true,
			userLoginStatus: "success"
		}));
	}
}

export function* watchFetchUser() {
	yield takeEvery(loginAction.googleLoginUserSaga, fetchGoogleData);
}


