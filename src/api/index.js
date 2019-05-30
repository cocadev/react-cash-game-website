import AuthApi from "./auth.api";
import FriendApi from "./friend.api";


export default {
	auth: new AuthApi(),
	friend: new FriendApi()
};
