import React from 'react';

import { bool, func, object, string } from "prop-types";

import { CSSTransition } from 'react-transition-group';

import classnames from "classnames";
import MenuButton from "../../components/Buttons/MenuButton/MenuButton";

import classes from "./MobileMenu.less";


export default class MobileMenu extends React.Component {
	static propTypes = {
		closeMenu: func,
		handleItemMenuClick: func,
		hideMenu: func,
		isMobileMenuOpen: bool,
		menuSettings: object,
		nextMenu: string,
		nextMenuScreen: func,
		showMenu: func
	}

	state = {
		onExitingAnimation: false,
		menuSettings: {},
	}

	componentDidMount() {
		this.setState({
			menuSettings: this.props.menuSettings
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.menuSettings !== this.state.menuSettings && !this.state.onExitingAnimation) {
			this.setState({
				menuSettings: nextProps.menuSettings
			});
		}
	}

	componentDidUpdate() {
		/**
		 * changes menu with animations worked only when menu was set from nexMenuSet
		 */
		if (this.props.nextMenu !== "") {
			this.props.hideMenu();
		}

		if (!this.state.onExitingAnimation && this.props.nextMenu !== "") {
			this.props.showMenu(this.props.nextMenu);
			this.props.nextMenuScreen("");
		}
	}

	/**
	 * Shows menu if button was clicked
	 */
	render() {
		const { isMobileMenuOpen, width } = this.props;

		const { onExitingAnimation, menuSettings, } = this.state;

		const showMenuClasses = classnames({
			[classes.mobileMenu]: true,
			[classes.mobileMenuHide]: !onExitingAnimation
		});

		return (
			<div
				className={showMenuClasses}
			>
				<CSSTransition
					in={isMobileMenuOpen} timeout={300} classNames={menuSettings.classes} onEnter={() => {
						this.setState({
							onExitingAnimation: true
						});
					}} onExited={() => {
						this.setState({
							onExitingAnimation: false
						});

						this.setState({
							menuSettings: this.props.menuSettings
						});
					}}
				>
					<div
						className={classes.mobileMenuWrapper}
						style={{
							width,
							backgroundImage: `url(${menuSettings.background})`,
							backgroundSize: "cover",
							position: menuSettings.position,
							height: menuSettings.position && "auto"
						}}
						onClick={this.handleItemClick}
					>
						<MenuButton onClick={this.props.closeMenu} isMobileMenuOpen />
						{ this.props.children }
					</div>
				</CSSTransition>
			</div>
		);
	}
}
