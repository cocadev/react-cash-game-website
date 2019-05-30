import React from 'react';
import classnames from "classnames";
// import MenuIcon from '@material-ui/icons/Menu';

import classes from "./MenuButton.less";

/**
 * Renders menu button (works on mobile)
 */
class MenuButton extends React.Component {
	state = {
		isButtonClicked: false
	}
	/**
	 * Shows menu if button was clicked
	 */
	onButtonClick = () => {
		this.setState({
			isButtonClicked: !this.state.isButtonClicked
		});
	}

	render() {
		const { isButtonClicked } = this.state;

		const menuClasses = classnames({
			[classes.menuButton]: true,
			[classes.menuButtonActive]: isButtonClicked
		});

		return (
			<div onClick={this.onButtonClick} className={menuClasses} />
		);
	}
}

export default MenuButton;
