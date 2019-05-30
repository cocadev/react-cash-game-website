import { createReducer } from "redux-act";
import * as actions from "../winners/winners.actions";

const initialState = {
	winners: [],
	winnersStatus: ""
};

const reducer = {
	[actions.fetchWinnersSaga]: (state) => ({
		...state,
		winnersStatus: "pending"
	}),

	[actions.setWinners]: (state, data) => ({
		...state,
		winners: data.winners,
		winnersStatus: data.winnersStatus
	})

};


export default createReducer(reducer, initialState);
