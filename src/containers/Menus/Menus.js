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


	render() {
		const { menuVisibility, menuName } = this.props;

		return (
			<MobileMenu
				closeMenu={this.onCloseMenuClick}
				isMobileMenuOpen={menuVisibility}
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

