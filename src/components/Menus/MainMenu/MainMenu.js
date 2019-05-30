import React, { Component } from 'react';

import { func } from "prop-types";

import { connect } from "react-redux";

import * as menusActions from "../../../modules/menus/menus.actions";

import classes from "./MainMenus.less";


class MainMenu extends Component {
	static propTypes = {
		hideMenu: func,
		setTabIndex: func
	}

	handleItemClick = (event) => {
		const tabHref = ["Sale", "Winners", "Friends", "Loot"];

		if (event.target.innerText && event.target.localName !== "div") {
			const tabIndex = tabHref.findIndex((item) => {
				return item === event.target.innerText;
			});

			//this.props.handleItemMenuClick(null, tabIndex);

			console.log(tabIndex);

			this.props.setTabIndex(tabIndex);

			this.props.hideMenu();
		}
	}

	render() {
		return (
			<div onClick={this.handleItemClick} className={classes.mainMenu}>
				<h1>Sale</h1>
				<h1>Winners</h1>
				<h1>Friends</h1>
				<h1>Loot</h1>
			</div>

		);
	}
}

export default connect(null, { ...menusActions })((MainMenu));

