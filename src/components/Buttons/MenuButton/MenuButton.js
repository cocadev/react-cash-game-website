import React from 'react';
import { func, bool } from "prop-types";
import classnames from "classnames";

import classes from "./MenuButton.less";

/**
 * Renders menu button (works on mobile)
 */
class MenuButton extends React.Component {
	static propTypes = {
		isMobileMenuOpen: bool,
		onClick: func
	}
	/**
	 * Shows menu if button was clicked
	 */
	onButtonClick = () => {
		this.props.onClick();
	}

	render() {
		const { isMobileMenuOpen } = this.props;

		const menuClasses = classnames({
			[classes.menuButton]: true,
			[classes.menuButtonActive]: isMobileMenuOpen
		});

		return (
			<div onClick={this.onButtonClick} className={menuClasses} />
		);
	}
}

export default MenuButton;
