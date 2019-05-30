import React, { Component } from 'react';

import { func, string, bool } from "prop-types";

import { connect } from "react-redux";

import MobileMenu from "../../components/MobileMenu/MobileMenu";

import MainMenus from "../../components/Menus/MainMenu/MainMenu";

import * as menusActions from "../../modules/menus/menus.actions";


class Menus extends Component {
	static propTypes = {
		hideMenu: func,
		menuName: string,
		menuVisibility: bool
	}

	onCloseMenuClick = () => {
		this.props.hideMenu();
	}


	render() {
		const { menuVisibility, menuName } = this.props;

		return (
			<MobileMenu
				closeMenu={this.onCloseMenuClick}
				isMobileMenuOpen={menuVisibility}
			>
				{ menuName === "main" &&
					<MainMenus />
				}
			</MobileMenu>
		);
	}
}

function mapStateToProps({ menus }) {
	return {
		menuVisibility: menus.menuVisibility,
		menuName: menus.menuName,
	};
}

export default connect(mapStateToProps, { ...menusActions })((Menus));

