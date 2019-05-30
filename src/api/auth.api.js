import axios from 'axios';
import { api } from "../config";


export default class AuthApi {
	get urls() {
		return api.urls.auth;
	}

	async v1Player(sessionId) {
		try {
			const result = await axios.get(this.urls.v1Player, {
				headers: {
					Authorization: sessionId
				}
			});

			return result;
		} catch (e) {
			console.log("v1Player", e);
		}
	}

	async termsOfServiceConfirmAge(sessionId, data) {
		try {
			const result = await axios.post(this.urls.termsOfService, {
				headers: {
					Authorization: sessionId
				},
				params: {
					dob: data
				}
			});

			return result;
		} catch (e) {
			console.log("termsOfServiceConfirmAge", e);
		}
	}
}
