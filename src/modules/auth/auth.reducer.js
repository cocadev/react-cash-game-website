import { createReducer } from "redux-act";
import * as actions from "../auth/auth.actions";

const initialState = {
	user: null
};

const reducer = {
	[actions.setCurrentUser]: (state) => ({
		...state,
		user: true
	}),

};


export default createReducer(reducer, initialState);
