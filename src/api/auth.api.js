import axios from 'axios';
import store from "store";
import { api } from "../config";


export default class AuthApi {
	get urls() {
		return api.urls.auth;
	}

	get sessionID() {
		return store.get("userSessionId");
	}

	async v1Player() {
		const result = await axios({
			method: 'GET',
			url: this.urls.v1Player,
			headers: {
				Authorization: this.sessionID
			}
		});

		return result;
	}
	async setUserName(sessionID, screen_name) {
		const result = await axios({
			method: 'POST',
			url: this.urls.v1Player,
			headers: {
				Authorization: sessionID
			},
			data: {
				screen_name
			}
		});

		return result;
	}

	async returnBonus(sessionID) {
		const result = await axios({
			method: 'GET',
			url: this.urls.returnBonus,
			headers: {
				Authorization: sessionID
			}
		});

		return result;
	}

	async termsOfServiceConfirmAge(sessionID, data) {
		const result = await axios({
			method: 'POST',
			url: this.urls.termsOfService,
			data: {
				dob: data
			},
			headers: {
				Authorization: sessionID
			}
		});

		return result;
	}

	async logoutUser(sessionID) {
		const result = await axios({
			method: 'POST',
			url: this.urls.logout,
			headers: {
				Authorization: sessionID
			}
		});

		return result;
	}
}
