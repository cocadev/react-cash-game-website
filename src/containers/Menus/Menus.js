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
		nextMenu: string,
		nextMenuScreen: func,
		userData: object
	}

	state = {
		screenWidth: screen.width,
		lastWidthValue: ""
	}

	componentDidMount() {
		window.addEventListener("resize", this.updateDimensions);
	}

	onCloseMenuClick = () => {
		this.props.hideMenu();
	}

	getClass = () => {
		const { menuName } = this.props;

		if (menuName === "profile" && this.state.screenWidth > 756) {
			return "fade-left";
		}

		return "fade";
	}

	setLastWidthValue = (argument) => {
		if (this.state.lastWidthValue !== argument) {
			this.setState({
				lastWidthValue: argument
			});
		}
	}

	getMenuWidth = () => {
		const { menuName, menuVisibility } = this.props;

		if (menuVisibility) {
			if (menuName === "profile" && this.state.screenWidth > 756) {
				this.setLastWidthValue("320px");

				return "320px";
			}

			this.setLastWidthValue("100%");

			return "100%";
		}
		return this.state.lastWidthValue;
	}

	getBackground = () => {
		return ProfileBackground;
	}

	updateDimensions = () => {
		console.log("chage Dimensions");
		this.setState({
			screenWidth: screen.width
		});
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions);
	}


	render() {
		const { menuVisibility, menuName } = this.props;
		const menuSettings = {
			classes: this.getClass(),
			background: this.getBackground(),
			position: menuName === "notification" && "absolute"
		};

		const width = this.getMenuWidth();

		return (
			<MobileMenu
				closeMenu={this.onCloseMenuClick}
				nextMenu={this.props.nextMenu}
				nextMenuScreen={this.props.nextMenuScreen}
				isMobileMenuOpen={menuVisibility}
				menuSettings={menuSettings}
				showMenu={this.props.showMenu}
				hideMenu={this.props.hideMenu}
				width={width}
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

