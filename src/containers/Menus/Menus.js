import React, { Component } from 'react';

import { func, string, bool, object } from "prop-types";

import { connect } from "react-redux";

import MobileMenu from "../../components/MobileMenu/MobileMenu";

import MainMenu from "../../components/Menus/MainMenu/MainMenu";

import Profile from "../../components/Menus/Profile/Profile";

import ProfileBackground from "../../images/backgrounds/menubackground.png";

import Notification from "../../components/Menus/SubMenu/Notification/Notification";

import * as menusActions from "../../modules/menus/menus.actions";
import * as authActions from "../../modules/auth/auth.actions";


class Menus extends Component {
	static propTypes = {
		hideMenu: func,
		menuName: string,
		menuVisibility: bool,
		nextMenuScreen: func,
		nextMenu: string,
		userData: object
	}

	onCloseMenuClick = () => {
		this.props.hideMenu();
	}

	getClass = () => {
		const { menuName } = this.props;

		if (menuName === "profile" && screen.width > 756) {
			return "fade-left";
		}

		return "fade";
	}

	getMenuWidth = () => {
		const { menuName } = this.props;

		if (menuName === "profile" && screen.width > 756) {
			return "320px";
		}

		return "100%";
	}

	getBackground = () => {
		return ProfileBackground;
	}


	render() {
		const { menuVisibility, menuName } = this.props;
		const menuSettings = {
			classes: this.getClass(),
			width: this.getMenuWidth(),
			background: this.getBackground()
		};

		return (
			<MobileMenu
				closeMenu={this.onCloseMenuClick}
				nextMenu={this.props.nextMenu}
				nextMenuScreen={this.props.nextMenuScreen}
				isMobileMenuOpen={menuVisibility}
				menuSettings={menuSettings}
				showMenu={this.props.showMenu}
				hideMenu={this.props.hideMenu}
			>
				{ menuName === "main" &&
					<MainMenu {...this.props} />
				}

				{ menuName === "profile" &&
					<Profile {...this.props} />
				}

				{ menuName === "notification" &&
					<Notification />
				}
			</MobileMenu>
		);
	}
}

function mapStateToProps({ menus, auth }) {
	return {
		menuVisibility: menus.menuVisibility,
		nextMenu: menus.nextMenuScreen,
		menuName: menus.menuName,
		userData: auth.userData,
	};
}

export default connect(mapStateToProps, { ...menusActions, ...authActions })((Menus));

