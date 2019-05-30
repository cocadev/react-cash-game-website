import { createReducer } from "redux-act";
import * as actions from "../menus/menus.actions";

const initialState = {
	menuVisibility: false,
	menuName: "",
	tabIndex: false,
	lootBoxVisibility: true,
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

	[actions.showLootBox]: (state) => ({
		...state,
		lootBoxVisibility: true
	}),

	[actions.hideLootBox]: (state) => ({
		...state,
		lootBoxVisibility: false
	})
};


export default createReducer(reducer, initialState);
