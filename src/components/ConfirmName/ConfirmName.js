import React from 'react';
import { bool, func } from "prop-types";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import classes from "./ConfirmName.less";


class ConfirmName extends React.Component {
	static propTypes = {
		open: bool,
		setLoginName: func
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
		const { open } = this.props;

		const { userName } = this.state;

		return (
			<div className={classes.confirmName}>
				<Dialog
					open={open}
					scroll="paper"
					aria-labelledby="scroll-dialog-title"
				>
					<DialogTitle id="scroll-dialog-title">Confirm User Name</DialogTitle>
					<DialogActions className={classes.confirmNameDialogAction}>
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
						<div className={classes.confirmNameButtonWrapper}>
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

export default ConfirmName;
