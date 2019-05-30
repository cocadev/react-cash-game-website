import axios from 'axios';
import { api } from "../config";


export default class AuthApi {
	get urls() {
		return api.urls.auth;
	}

	async v1Player(sessionId) {
		const result = await axios.get(this.urls.v1Player, {
			headers: {
				Authorization: sessionId
			}
		});

		return result;
	}

	async termsOfServiceConfirmAge(sessionId, data) {
		const result = await axios.post(this.urls.termsOfService, {
			headers: {
				Authorization: sessionId
			},
			params: {
				dob: data
			}
		});

		return result;
	}
}
