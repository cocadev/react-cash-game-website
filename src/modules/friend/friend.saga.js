import api from "../../api";

import * as  friendAction from "../friend/friend.actions";

import { takeEvery, put, select } from "redux-saga/effects";

export const userSessionId = (state) => state.auth.userSessionId;

function* fetchFriends() {
	try {
		const sessionId = yield select(userSessionId);

		const result = yield api.friend.listFriends(sessionId);
		console.log(result);
	} catch (e) {
		console.log("fetchFriends", e);
	}
}

function* fetchAcceptFriend(data) {
	try {
		const sessionId = yield select(userSessionId);
		const friend_uuid = data.payload.friend_uuid;

		const result = yield api.friend.acceptFriendRequest(sessionId, friend_uuid);
		console.log(result);
	} catch (e) {
		console.log("fetchAcceptFriendRequest", e);
	}
}

function* fetchRemoveFriend(data) {
	try {
		const sessionId = yield select(userSessionId);
		const friend_uuid = data.payload.friend_uuid;

		const result = yield api.friend.removeFriend(sessionId, friend_uuid);
		console.log(result);
	} catch (e) {
		console.log("fetchAcceptFriendRequest", e);
	}
}


export function* watchFetchFriend() {
	yield takeEvery(friendAction.listFriendsSaga, fetchFriends);
	yield takeEvery(friendAction.acceptFriendSaga, fetchAcceptFriend);
	yield takeEvery(friendAction.removeFriendSaga, fetchRemoveFriend);
}


