import api from "../../api";

import * as  winnersActions from "../winners/winners.actions";

import customToastify from "../../helpers/customToastify";

import { takeEvery, put } from "redux-saga/effects";

export const userSessionId = (state) => state.auth.userSessionId;
export const user = (state) => state.auth.user;

function* fetchWinners() {
	const result = yield api.winners.getWinners();
	console.log(result);
	yield put(winnersActions.setWinners({ winners: result.data, winnersStatus: "success" }));
}

export function* watchFetchWinners() {
	yield takeEvery(winnersActions.fetchWinnersSaga, fetchWinners);
}


