import api from "../../api";
import history from "../../modules/history";

import * as  friendAction from "../friend/friend.actions";

import customToastify from "../../helpers/customToastify";
import { takeEvery, put, select } from "redux-saga/effects";

export const userSessionId = (state) => state.auth.userSessionId;
export const user = (state) => state.auth.user;

function* fetchFriends() {
	const result = yield api.friend.listFriends();

	yield put(friendAction.setListFriends({ friends: result.data, friendsStatus: "success" }));
}

function* fetchAcceptFriend(data) {
	const friend_uuid = data.payload.friend_uuid;

	const result = yield api.friend.acceptFriendRequest(friend_uuid);

	yield put(friendAction.listFriendsSaga());
}

function* fetchRemoveFriend(data) {
	const friend_uuid = data.payload.friend_uuid;

	const result = yield api.friend.removeFriend(friend_uuid);

	yield put(friendAction.listFriendsSaga());
}

function* fetchNewFriends(data) {
	const userLogin = yield select(user);

	const sessionId = yield select(userSessionId);
	const friend_uuid = data.payload.invite_uuid;

	const result = yield api.friend.newFriend(sessionId, friend_uuid);

	if (userLogin) {
		customToastify("Invite has been sent", "success");
	}

	yield put(friendAction.listFriendsSaga());
	history.push("/");
}


export function* watchFetchFriend() {
	yield takeEvery(friendAction.newFriendSaga, fetchNewFriends);
	yield takeEvery(friendAction.listFriendsSaga, fetchFriends);
	yield takeEvery(friendAction.acceptFriendSaga, fetchAcceptFriend);
	yield takeEvery(friendAction.removeFriendSaga, fetchRemoveFriend);
}


