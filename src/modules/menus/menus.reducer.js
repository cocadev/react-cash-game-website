import { createReducer } from "redux-act";
import * as actions from "../menus/menus.actions";

const initialState = {
	menuVisibility: false,
	menuName: "",
	tabIndex: false
};

const reducer = {
	[actions.showMenu]: (state, menuName) => ({
		...state,
		menuVisibility: true,
		menuName
	}),

	[actions.hideMenu]: (state) => ({
		...state,
		menuVisibility: false,
		menuName: ""
	}),

	[actions.setTabIndex]: (state, index) => ({
		...state,
		tabIndex: index
	}),
};


export default createReducer(reducer, initialState);
