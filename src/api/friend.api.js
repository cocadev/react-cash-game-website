import axios from 'axios';
import { api } from "../config";


export default class FriendApi {
	get urls() {
		return api.urls.friend;
	}

	async newFriend(sessionId, invite_uuid) {
		const result = await axios.put(`${this.urls.newFriend}${invite_uuid}`, {
			headers: {
				Authorization: sessionId
			},
		});

		return result;
	}

	async listFriends(sessionId) {
		const result = await axios.get(this.urls.listFriends, {
			headers: {
				Authorization: sessionId
			}
		});

		return result;
	}

	async acceptFriendRequest(sessionId, friend_uuid) {
		const result = await axios.post(`${this.urls.acceptFriendRequest}${friend_uuid}`, {
			headers: {
				Authorization: sessionId
			}
		});

		return result;
	}

	async removeFriend(sessionId, friend_uuid) {
		const result = await axios.delete(`${this.urls.removeFriend}${friend_uuid}`, {
			headers: {
				Authorization: sessionId
			}
		});

		return result;
	}
}
