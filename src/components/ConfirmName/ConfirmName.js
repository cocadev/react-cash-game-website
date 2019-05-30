import React, { Fragment } from 'react';
import { bool, func, object } from "prop-types";

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';


const styles = () => ({
	dialogAction: {
		display: "block",
		paddingLeft: "10px"
	},
	buttonWrapper: {
		display: 'flex',
		justifyContent: 'flex-end'
	}
});


class ConfirmName extends React.Component {
	static propTypes = {
		classes: object,
		setLoginName: func,
		open: bool
	}

	state = {
		userName: ""
	}

	onNameChange = (event) => {
		this.setState({
			userName: event.target.value
		});
	}


	onSubmitBtnClick = () => {
		this.props.setLoginName(this.state.userName);
	}

	render() {
		const { open, classes } = this.props;

		const { userName } = this.state;

		return (
			<div>
				<Dialog
					open={open}
					scroll="paper"
					aria-labelledby="scroll-dialog-title"
				>
					<DialogTitle id="scroll-dialog-title">Confirm User Name</DialogTitle>
					<DialogActions className={classes.dialogAction}>
						<div>
							<TextField
								onChange={this.onNameChange}
								label="User Name"
								type="text"
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</div>
						<div className={classes.buttonWrapper}>
							<Button disabled={userName.length <= 3} onClick={this.onSubmitBtnClick} color="primary">
								Ok
							</Button>
						</div>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default withStyles(styles)(ConfirmName);
