import React from 'react';

import { bool, func } from "prop-types";

import { CSSTransition } from 'react-transition-group';

import classnames from "classnames";
import MenuButton from "../../components/Buttons/MenuButton/MenuButton";

import classes from "./MobileMenu.less";


export default class MobileMenu extends React.Component {
	static propTypes = {
		closeMenu: func,
		handleItemMenuClick: func,
		isMobileMenuOpen: bool
	}

	state = {
		onExitingAnimation: false
	}

	/**
	 * Handles click on menu items and after click collapse menu
	 */

	/**
	 * Shows menu if button was clicked
	 */
	render() {
		const { isMobileMenuOpen } = this.props;

		const { onExitingAnimation } = this.state;

		const showMenuClasses = classnames({
			[classes.mobileMenu]: true,
			[classes.mobileMenuHide]: !onExitingAnimation
		});

		return (
			<div
				className={showMenuClasses}
			>
				<CSSTransition
					in={isMobileMenuOpen} timeout={300} classNames={"fade"} onEnter={() => {
						this.setState({
							onExitingAnimation: true
						});
					}} onExited={() => {
						this.setState({
							onExitingAnimation: false
						});
					}}
				>
					<div className={classes.mobileMenuWrapper} onClick={this.handleItemClick} >
						<MenuButton onClick={this.props.closeMenu} isMobileMenuOpen />
						{ this.props.children }
					</div>
				</CSSTransition>
			</div>
		);
	}
}
