import api from "../../api";
import history from "../../modules/history";

import * as  friendAction from "../friend/friend.actions";

import { takeEvery, put, select } from "redux-saga/effects";
import customToastify from "../../helpers/customToastify";

export const userSessionId = (state) => state.auth.userSessionId;
export const user = (state) => state.auth.user;

function* fetchFriends() {
	try {
		const sessionId = yield select(userSessionId);

		const result = yield api.friend.listFriends(sessionId);

		yield put(friendAction.setListFriends({ friends: result.data, friendsStatus: "success" }));
	} catch (e) {
		console.log("fetchFriends", e);
	}
}

function* fetchAcceptFriend(data) {
	try {
		const friend_uuid = data.payload.friend_uuid;

		const result = yield api.friend.acceptFriendRequest(friend_uuid);

		yield put(friendAction.listFriendsSaga());
	} catch (e) {
		console.log("fetchAcceptFriendRequest", e);
	}
}

function* fetchRemoveFriend(data) {
	try {
		const friend_uuid = data.payload.friend_uuid;

		const result = yield api.friend.removeFriend(friend_uuid);
		yield put(friendAction.listFriendsSaga());
	} catch (e) {
		console.log("fetchAcceptFriendRequest", e);
	}
}

function* fetchNewFriends(data) {
	try {
		const userLogin = yield select(user);

		const sessionId = yield select(userSessionId);
		const friend_uuid = data.payload.invite_uuid;

		const result = yield api.friend.newFriend(sessionId, friend_uuid);

		if (userLogin) {
			customToastify("Invite has been sent", "success");
		}

		yield put(friendAction.listFriendsSaga());
		history.push("/");
	} catch (e) {
		console.log("fetchAcceptFriendRequest", e);
	}
}


export function* watchFetchFriend() {
	yield takeEvery(friendAction.newFriendSaga, fetchNewFriends);
	yield takeEvery(friendAction.listFriendsSaga, fetchFriends);
	yield takeEvery(friendAction.acceptFriendSaga, fetchAcceptFriend);
	yield takeEvery(friendAction.removeFriendSaga, fetchRemoveFriend);
}


