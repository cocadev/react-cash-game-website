import React from 'react';
import { func } from "prop-types";

import LogoutIcon from '@material-ui/icons/ExitToApp';

import classes from "./LogoutButton.less";

/**
 * Renders logout button
 */
class LogoutButton extends React.Component {
	static propTypes = {
		logout: func
	}

	render() {
		const { logout } = this.props;
		return (
			<div onClick={logout} className={classes.logoutButton}>
				<LogoutIcon />
			</div>
		);
	}
}

export default LogoutButton;
