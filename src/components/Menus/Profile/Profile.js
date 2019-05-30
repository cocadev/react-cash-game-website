import React, { Component } from 'react';

import { func, object } from "prop-types";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import AddAPhoto from '@material-ui/icons/AddAPhoto';
import Edit from '@material-ui/icons/Edit';
import DialogTitle from '@material-ui/core/DialogTitle';
import Switch from '@material-ui/core/Switch';

import UserWidget from "../../../components/UserWidget/UserWidget";

import classes from "./Profile.less";

class Profile extends Component {
	static propTypes = {
		changeLoginNameSaga: func,
		hideLootBox: func,
		hideMenu: func,
		setTabIndex: func,
		userData: object,
	}

	constructor(props) {
		super(props);
		this.inputFileRef = React.createRef();
	}

	state = {
		isDialogOpen: false,
		nameText: "",
		notification: false
	};

	// handleItemClick = (event) => {
	// 	const tabHref = ["Sale", "Winners", "Friends", "Loot"];
	//
	// 	if (event.target.innerText && event.target.localName !== "div") {
	// 		const tabIndex = tabHref.findIndex((item) => {
	// 			return item === event.target.innerText;
	// 		});
	//
	// 		this.props.setTabIndex(tabIndex);
	//
	// 		this.props.hideMenu();
	//
	// 		this.props.hideLootBox();
	// 	}
	// }

	onNameInputChange = (event) => {
		this.setState({
			nameText: event.target.value
		});
	}

	handleClickOpen = () => {
		this.setState({ isDialogOpen: true });
	};

	handleClose = () => {
		this.setState({ isDialogOpen: false });
	};

	handleSaveName = () => {
		this.props.changeLoginNameSaga(this.state.nameText);

		this.handleClose();
	}

	changePhotoButtonClick = () => {
		this.inputFileRef.current.click();
	}

	handleNotificationChange = (event) => {
		this.setState({ notification: event.target.checked });
	};

	render() {
		const { userData } = this.props;

		const { notification } = this.state;

		return (
			<div className={classes.profile}>
				<div className={classes.profileContent}>
					<div className={classes.profileUserWidgetContent}>
						<div className={classes.profileUserWidgetWrapper}>
							<UserWidget
								imgSrc={userData.picture}
								coins={userData.FUN_balance}
								name={userData.screen_name}
								profilePage
							/>
							<Button onClick={this.handleClickOpen}>
								<Edit />
							Change Username
							</Button>
						</div>

						<Button onClick={this.changePhotoButtonClick}>
							<AddAPhoto />
						Change profile pic
						</Button>
						<input className={classes.profileHide} ref={this.inputFileRef} type="file" />
					</div>

					<Dialog
						open={this.state.isDialogOpen}
						onClose={this.handleClose}
						aria-labelledby="form-dialog-title"
					>
						<DialogTitle id="form-dialog-title">Change Username</DialogTitle>
						<DialogContent>
							<TextField
								autoFocus
								margin="dense"
								id="name"
								label="Username"
								fullWidth
								placeholder={userData.screen_name}
								onChange={this.onNameInputChange}

							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={this.handleClose} color="primary">
								Cancel
							</Button>
							<Button onClick={this.handleSaveName} color="primary">
								Save
							</Button>
						</DialogActions>
					</Dialog>


					<div className={classes.profileMenuItem}>
						<p>Terms</p>
						<p>Privacy</p>
						<p>Sweepstakes rules</p>
						<p>contact us</p>
						<p>help</p>
						<p>notification
							<Switch
								checked={notification}
								onChange={this.handleNotificationChange}
								value="checkedC"
							/>
							<span>{ notification ? "On" : "Off"  }</span>
						</p>
					</div>
				</div>
			</div>

		);
	}
}

export default Profile;

