import React from 'react';
import { object, func } from "prop-types";

import { withStyles } from '@material-ui/core/styles';

import LogoutIcon from '@material-ui/icons/ExitToApp';

const styles = () => ({
	root: {
		position: "fixed",
		bottom: "0",
		left: "15px",
		zIndex: "99",
		transform: "rotate(180deg)",
		cursor: "pointer"
	},

});


class LogoutButton extends React.Component {
	static propTypes = {
		classes: object,
		logout: func
	}

	render() {
		const { classes, logout } = this.props;
		return (
			<div onClick={logout} className={classes.root}>
				<LogoutIcon />
			</div>
		);
	}
}

export default withStyles(styles,  { withTheme: true })(LogoutButton);
