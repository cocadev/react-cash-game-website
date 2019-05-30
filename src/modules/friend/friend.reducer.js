import { createReducer } from "redux-act";
import * as actions from "../friend/friend.actions";

const initialState = {
	friends: [],
	friendsStatus: ""
};

const reducer = {
	[actions.listFriendsSaga]: (state) => ({
		...state,
		friendsStatus: "pending"
	}),

	[actions.setListFriends]: (state, data) => ({
		...state,
		friends: data.friends,
		friendsStatus: data.friendsStatus
	})

};


export default createReducer(reducer, initialState);
