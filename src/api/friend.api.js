import axios from 'axios';
import store from "store";
import { api } from "../config";


export default class FriendApi {
	get urls() {
		return api.urls.friend;
	}

	get sessionID() {
		return store.get("userSessionId");
	}

	async newFriend(sessionId, invite_uuid) {
		const result = await axios({
			method: 'PUT',
			url: `${this.urls.newFriend}${invite_uuid}`,
			headers: {
				Authorization: this.sessionID
			}
		});

		return result;
	}

	async listFriends(sessionId) {
		const result = await axios({
			method: 'GET',
			url: this.urls.listFriends,
			headers: {
				Authorization: this.sessionID
			}
		});

		return result;
	}

	async acceptFriendRequest(friend_uuid) {
		const result = await axios({
			method: 'POST',
			url: `${this.urls.acceptFriendRequest}${friend_uuid}`,
			headers: {
				Authorization: this.sessionID
			}
		});

		return result;
	}

	async removeFriend(friend_uuid) {
		const result = await axios({
			method: 'DELETE',
			url: `${this.urls.removeFriend}${friend_uuid}`,
			headers: {
				Authorization: this.sessionID
			}
		});

		return result;
	}
}
