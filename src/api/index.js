import AuthApi from "./auth.api";
import FriendApi from "./friend.api";
import SaleApi from "./sale.api";
import WinnersApi from "./winners.api";


export default {
	auth: new AuthApi(),
	friend: new FriendApi(),
	sale: new SaleApi(),
	winners: new WinnersApi()
};
