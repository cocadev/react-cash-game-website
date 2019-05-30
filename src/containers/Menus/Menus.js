import React, { Component } from 'react';

import { func, string, bool, object } from "prop-types";

import { connect } from "react-redux";

import MobileMenu from "../../components/MobileMenu/MobileMenu";

import MainMenu from "../../components/Menus/MainMenu/MainMenu";

import Profile from "../../components/Menus/Profile/Profile";

import * as menusActions from "../../modules/menus/menus.actions";
import * as authActions from "../../modules/auth/auth.actions";


class Menus extends Component {
	static propTypes = {
		hideMenu: func,
		menuName: string,
		menuVisibility: bool,
		userData: object
	}

	onCloseMenuClick = () => {
		this.props.hideMenu();
	}

	setClass = () => {
		const { menuName } = this.props;

		if (menuName === "profile" && screen.width > 756) {
			return "fade-left";
		}

		return "fade";
	}

	setMenuWidth = () => {
		const { menuName } = this.props;

		if (menuName === "profile" && screen.width > 756) {
			return "320px";
		}

		return "100%";
	}


	render() {
		const { menuVisibility, menuName } = this.props;
		const menuSettings = {
			classes: this.setClass(),
			width: this.setMenuWidth(),
		};

		return (
			<MobileMenu
				closeMenu={this.onCloseMenuClick}
				isMobileMenuOpen={menuVisibility}
				menuSettings={menuSettings}
			>
				{ menuName === "main" &&
					<MainMenu {...this.props} />
				}

				{ menuName === "profile" &&
					<Profile {...this.props} />
				}
			</MobileMenu>
		);
	}
}

function mapStateToProps({ menus, auth }) {
	return {
		menuVisibility: menus.menuVisibility,
		menuName: menus.menuName,
		userData: auth.userData,
	};
}

export default connect(mapStateToProps, { ...menusActions, ...authActions })((Menus));

