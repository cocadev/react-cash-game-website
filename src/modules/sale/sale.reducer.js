import { createReducer } from "redux-act";
import * as actions from "./sale.actions";

const initialState = {
	offers: [],
	offersStatus: ""
};

const reducer = {
	[actions.getOffersSaga]: (state) => ({
		...state,
		offersStatus: "pending"
	}),

	[actions.setOffers]: (state, data) => ({
		...state,
		offers: data.offers,
		offersStatus: data.offersStatus
	})

};


export default createReducer(reducer, initialState);
