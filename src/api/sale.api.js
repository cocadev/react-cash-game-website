import axios from 'axios';
import store from "store";
import { api } from "../config";


export default class FriendApi {
	get urls() {
		return api.urls.sale;
	}

	get sessionID() {
		return store.get("userSessionId");
	}

	async getOffers() {
		const result = await axios({
			method: 'GET',
			url: this.urls.offers,
			headers: {
				Authorization: this.sessionID
			}
		});

		return result;
	}
}
