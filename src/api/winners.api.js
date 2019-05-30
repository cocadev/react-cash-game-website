import axios from 'axios';
import store from "store";
import { api } from "../config";


export default class Winners {
	get urls() {
		return api.urls.winners;
	}

	get sessionID() {
		return store.get("userSessionId");
	}

	async getWinners() {
		const result = await axios({
			method: 'POST',
			url: this.urls.getWinners,
			headers: {
				Authorization: this.sessionID
			}
		});

		return result;
	}
}
