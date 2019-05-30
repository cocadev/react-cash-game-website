import React, { Component } from 'react';

import { func } from "prop-types";


import SaleIcon from "../../../images/icons/shop.png";
import WinnersIcon from "../../../images/icons/dollar.png";
import FriendsIcon from "../../../images/icons/friends.png";
import LootIcon from "../../../images/icons/booxIcon.png";

import classes from "./MainMenus.less";


class MainMenu extends Component {
	static propTypes = {
		hideLootBox: func,
		hideMenu: func,
		setTabIndex: func
	}

	handleItemClick = (elementName) => (event) => {
		const tabHref = ["Sale", "Winners", "Friends", "Loot"];

		const tabIndex = tabHref.findIndex((item) => {
			return item === elementName;
		});

		this.props.setTabIndex(tabIndex);

		this.props.hideMenu();

		this.props.hideLootBox();
	}

	render() {
		return (
			<div className={classes.mainMenu}>
				<div onClick={this.handleItemClick("Sale")} className={classes.mainMenuSingleItem}>
					<img src={SaleIcon} alt="saleIcon" />
					<p>Sale</p>
				</div>
				<div onClick={this.handleItemClick("Winners")} className={classes.mainMenuSingleItem}>
					<img src={WinnersIcon} alt="WinnersIcon" />
					<p>Winners</p>
				</div>
				<div onClick={this.handleItemClick("Friends")} className={classes.mainMenuSingleItem}>
					<img src={FriendsIcon} alt="FriendsIcon" />
					<p>Friends</p>
				</div>
				<div onClick={this.handleItemClick("Loot")} className={classes.mainMenuSingleItem}>
					<img src={LootIcon} alt="LootIcon" />
					<p>Loot</p>
				</div>
			</div>

		);
	}
}

export default MainMenu;

