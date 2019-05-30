import React, { Component } from 'react';

import { func, object } from "prop-types";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import classnames from "classnames";
import BellIcon from "../../../images/icons/bell.png";
import Ribbon from "../../../images/ribbon.png";
import Odometer from "../../../components/Odometer/Odometer";
import Euro from  "../../../images/icons/euro.png";


import ContantUsIcon from "../../../images/icons/profileMenu/contactUs.png";
import ExitIcon from "../../../images/icons/profileMenu/exit.png";
import HelpIcon from "../../../images/icons/profileMenu/help.png";
import Notification from "../../../images/icons/profileMenu/notification.png";
import PrivicyIcon from "../../../images/icons/profileMenu/privacy.png";
import RulesIcon from "../../../images/icons/profileMenu/rules.png";
import TermsIcon from "../../../images/icons/profileMenu/terms.png";


import classes from "./Profile.less";
import ProfileMenuItem from "./ProfileMenuItem";

class Profile extends Component {
	static propTypes = {
		changeLoginNameSaga: func,
		hideLootBox: func,
		hideMenu: func,
		setTabIndex: func,
		userData: object,
		logoutStorePending:func
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

	renderTopItem = () => {
		const { userData } = this.props;

		const userChangeProfilePic = classnames({
			[classes.profileChangeBtn]: true,
			[classes.profileChangeBtnPicture]: true
		});

		const userChangeProfileUsername = classnames({
			[classes.profileChangeBtn]: true,
			[classes.profileChangeBtnUsername]: true
		});

		return (
			<div className={classes.profileUserWidgetContent}>
				<div className={classes.profileUserWidgetWrapper}>
					<div className={classes.profileUserWidget}>
						<div className={classes.profileUserWidgetElement}>
							<div className={classes.profileUserWidgetAvatarAndNotificationWrapper}>
								<div className={classes.profileUserWidgetNotification}>
									<img src={BellIcon} alt="bell" />
									<div className={classes.profileUserWidgetNotificationCounter}>
										<p>4</p>
									</div>
								</div>
								<div onClick={this.onAvatarClick} className={classes.profileUserWidgetImageWrapper}>
									<img className={classes.profileUserWidgetImage} src={userData.picture} alt="" />
								</div>
							</div>
							<a className={userChangeProfilePic} onClick={this.changePhotoButtonClick}>
								Change profile pic
							</a>
						</div>
						<div className={classes.profileUserWidgetRibbonWrapper}>
							<img className={classes.profileUserWidgetRibbonImage} src={Ribbon} alt="Ribbon" />
							<div className={classes.profileUserWidgetEuroWrapper}>
								<img src={Euro} alt="euro" />
								<Odometer
									value={userData.FUN_balance}
									format="(,ddd)"
									classes={classes.profileUserWidgetOdometerStyle}
								/>
							</div>

							<p>consec tetura</p>

							<a className={userChangeProfileUsername} onClick={this.handleClickOpen}>
								Change Username
							</a>
						</div>
					</div>
				</div>
				<input className={classes.profileHide} ref={this.inputFileRef} type="file" />
			</div>
		);
	}

	renderMenuItems = () => {
		const items = [
			{
				label: "Terms",
				icon: TermsIcon,
				isCheckbox: false,
				isNew: false
			},

			{
				label: "Privacy",
				icon: PrivicyIcon,
				isCheckbox: false,
				isNew: true
			},

			{
				label: "Sweepstakes rules",
				icon: RulesIcon,
				isCheckbox: false,
				isNew: false
			},

			{
				label: "contact us",
				icon: ContantUsIcon,
				isCheckbox: false,
				isNew: false
			},

			{
				label: "help",
				icon: HelpIcon,
				isCheckbox: false,
				isNew: false
			},

			{
				label: "notification",
				icon: Notification,
				isCheckbox: true,
				isNew: false
			},
		];

		return items.map((item) => {
			return (
				<ProfileMenuItem key={item.label} menuItem={item} />
			);
		});
	}

	render() {
		const { userData } = this.props;

		//const { notification } = this.state;

		return (
			<div className={classes.profile}>
				<div className={classes.profileContent}>

					{ this.renderTopItem() }

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

						{ this.renderMenuItems() }
					</div>

					<img onClick={this.props.logoutStorePending} className={classes.profileLogout} src={ExitIcon} alt="exit"/>
				</div>
			</div>

		);
	}
}

export default Profile;

