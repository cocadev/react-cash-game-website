import React, { Component } from 'react';

import { func } from "prop-types";

import classes from "./MainMenus.less";


class MainMenu extends Component {
	static propTypes = {
		hideLootBox: func,
		hideMenu: func,
		setTabIndex: func
	}

	handleItemClick = (event) => {
		const tabHref = ["Sale", "Winners", "Friends", "Loot"];

		if (event.target.innerText && event.target.localName !== "div") {
			const tabIndex = tabHref.findIndex((item) => {
				return item === event.target.innerText;
			});

			this.props.setTabIndex(tabIndex);

			this.props.hideMenu();

			this.props.hideLootBox();
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

export default MainMenu;

