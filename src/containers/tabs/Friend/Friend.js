import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { object, array, func } from "prop-types";

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import Paper from '@material-ui/core/Paper';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import Person from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import CutCorners from "../../../components/CutCorners/CutCorners";
import customToastify from "../../../helpers/customToastify";

import * as authActions from "../../../modules/auth/auth.actions";
import * as friendActions from "../../../modules/friend/friend.actions";
import { cutCorners } from "../../../helpers/cutCorners";

const styles = () => ({
	root: {
		width: '100%',
		marginTop: '30px',
	},
	buttonMargin: {
		marginTop: '30px',
	},
	linkMargin: {
		marginLeft: '20px',
		marginRight: "10px"
	},
	singleFriendWrapper: {
		display: "flex",
		padding: "10px",
		justifyContent: "space-between"
	},
	inviteWrapper: {
		display: "flex",
		alignItems: "center",
	},
	mainWrapper: {
		position: "relative"
	},
	mainWrapperContent: {
		margin: "20px 0 0 0",
		minHeight: "calc(100vh - 112px)",
		animation: "unset",
		display: "block"
	},
	singleFriendContent: {
		display: "flex",
	},
	friendButtonWrapper: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around"
	},
	emptyList: {
		color: "rgba(0, 0, 0, 0.54)",
		fontWeight: "500",
		fontSize: "18px",
	}
});

function copyStringToClipboard(str) {
	const el = document.createElement('textarea');
	el.value = str;

	document.body.appendChild(el);
	el.select();

	document.execCommand('copy');
	document.body.removeChild(el);
}


class Friend extends React.Component {
	static propTypes = {
		acceptFriendSaga: func,
		classes: object,
		friends: array,
		listFriendsSaga: func,
		removeFriendSaga: func,
		userData: object
	}

	state = {
		linkBtnCollapsed: true
	}

	onLinkBtnClick = () => {
		this.setState({
			linkBtnCollapsed: !this.state.linkBtnCollapsed
		});
	}

	onCopyBtnClick = () => {
		const { userData } = this.props;

		const linkText = `${document.location.href}#i=${userData.invite_code}`;

		copyStringToClipboard(linkText);
		customToastify("Add to clipboard", "success");
	}

	onAddToFriendBtnClick = (id) => (event) => {
		event.stopPropagation();

		this.props.acceptFriendSaga(id);
	}

	onDeleteBtnClick = (id) => (event) => {
		event.stopPropagation();
		this.props.removeFriendSaga(id);
	}

	returnMapFriend = (friend) => {
		const { classes } = this.props;

		const { status, id, screen_name, picture } = friend;

		if (status !== "R") {
			return (
				<Paper className={classes.singleFriendWrapper} key={id}>
					<div>
						<div>
							{
								picture !== "" ?
									<img src={picture} alt="" />
									:
									<Avatar>
										<Person />
									</Avatar>
							}
							<div>
								{screen_name}
							</div>
						</div>

						<div>
							<p>Status: {status === "P" ? "Pending" : "Accepted"}</p>
						</div>
					</div>
					<div className={classes.friendButtonWrapper}>
						{
							status === "P" &&
							<>
								<CutCorners clipStyle={cutCorners(7.5, 15)}>
									<Button
										color="primary"
										style={cutCorners(7.5, 15)}
										onClick={this.onAddToFriendBtnClick(id)}
										variant="contained"
									>
										<span>Accept</span>
									</Button>
								</CutCorners>

								<CutCorners clipStyle={cutCorners(7.5, 15)}>
									<Button
										color="secondary"
										style={cutCorners(7.5, 15)}
										onClick={this.onDeleteBtnClick(id)}
										variant="contained"
									>
										<span>Decline</span>
									</Button>
								</CutCorners>
							</>
						}

						{
							status === "A" &&
							<>
								<CutCorners clipStyle={cutCorners(7.5, 15)}>
									<Button
										fullWidth
										color="primary"
										style={cutCorners(7.5, 15)}
										onClick={this.onAddToFriendBtnClick(id)}
										variant="contained"
									>
										<span>Gift</span>
									</Button>
								</CutCorners>

								<CutCorners clipStyle={cutCorners(7.5, 15)}>
									<Button
										color="secondary"
										style={cutCorners(7.5, 15)}
										onClick={this.onDeleteBtnClick(id)}
										variant="contained"
									>
										<span>Unfriend</span>
									</Button>
								</CutCorners>

							</>
						}
					</div>
				</Paper>
			);
		}
	}

	renderLinkToFriend = () => {
		const { classes, userData } = this.props;

		const { linkBtnCollapsed } = this.state;

		const linkText = `${document.location.href}#i=${userData.invite_code}`;

		return (
			<Fragment>
				<Button
					style={cutCorners(7.5, 15)}
					onClick={this.onLinkBtnClick}
					color={linkBtnCollapsed ? "primary" : "secondary"}
					className={classes.buttonMargin}
				>
					<span>Invite</span>
				</Button>

				{ !linkBtnCollapsed &&
					<div className={classes.inviteWrapper}>
						<p className={classes.linkMargin}>{ linkText }</p>

						<CutCorners clipStyle={cutCorners(7.5, 15)} >
							<Button
								style={cutCorners(7.5, 15)}
								onClick={this.onCopyBtnClick}
								variant="contained"
							>
								<span>Copy link</span>
							</Button>
						</CutCorners>
					</div>
				}
			</Fragment>
		);
	}

	renderPendingFriends = () => {
		const { classes, friends } = this.props;

		return (
			<div className={classes.root}>
				<ExpansionPanel>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<div className={classes.column}>
							<p className={classes.heading}>PendingFriends</p>
						</div>
					</ExpansionPanelSummary>
					<Divider />
					{ friends.map((friend) => {
						return this.returnMapFriend(friend, "P");
					}) }

					<ExpansionPanelActions>
						<Button size="small">Cancel</Button>
						<Button size="small" color="primary">
							Save
						</Button>
					</ExpansionPanelActions>
				</ExpansionPanel>
			</div>
		);
	}

	renderFriends = () => {
		const { classes, friends } = this.props;

		return (
			<div className={classes.root}>
				<ExpansionPanel>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<div className={classes.column}>
							<p className={classes.heading}>Friends</p>
						</div>
					</ExpansionPanelSummary>
					<Divider />

					{ friends.map((friend) => {
						return this.returnMapFriend(friend, "A");
					}) }

					<ExpansionPanelActions>
						<Button size="small">Cancel</Button>
						<Button size="small" color="primary">
							Save
						</Button>
					</ExpansionPanelActions>
				</ExpansionPanel>
			</div>
		);
	}

	renderFriendList = () => {
		const { classes, friends } = this.props;
		let friendCount = 0;
		 friends.map((friend) => {
			if (friend.status === "A" || friend.status === "P") {
				friendCount++;
			}
		});

		if (friendCount > 0) {
			return (
				<div className={classes.root}>
					{friends.map((friend) => {
						return this.returnMapFriend(friend);
					})}
				</div>
			);
		}
		return (
			<div className={classes.root}>
				<p className={classes.emptyList}>Your friends list is empty</p>
			</div>
		);
	}

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.mainWrapperContent}>
				{ this.renderLinkToFriend() }
				{ this.renderFriendList() }
			</div>
		);
	}
}

function mapStateToProps({ auth, friend }) {
	return {
		userData: auth.userData,
		friends: friend.friends
	};
}

export default connect(mapStateToProps, { ...authActions, ...friendActions })((withStyles(styles,  { withTheme: true })(Friend)));

