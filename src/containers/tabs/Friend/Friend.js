import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { object, array, func } from "prop-types";

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

import classes from "./Friend.less";

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
		const { status, id, screen_name, picture } = friend;

		if (status !== "R") {
			return (
				<Paper className={classes.friendSingleFriendWrapper} key={id}>
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
					<div className={classes.friendFriendButtonWrapper}>
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
		const { userData } = this.props;

		const { linkBtnCollapsed } = this.state;

		const linkText = `${document.location.href}#i=${userData.invite_code}`;

		return (
			<Fragment>
				<Button
					style={cutCorners(7.5, 15)}
					onClick={this.onLinkBtnClick}
					color={linkBtnCollapsed ? "primary" : "secondary"}
					className={classes.friendButtonMargin}
				>
					<span>Invite</span>
				</Button>

				{ !linkBtnCollapsed &&
					<div className={classes.friendInviteWrapper}>
						<p className={classes.friendLinkMargin}>{ linkText }</p>

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
		const { friends } = this.props;

		return (
			<div className={classes.friendRoot}>
				<ExpansionPanel>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<div className={classes.friendColumn}>
							<p className={classes.friendHeading}>PendingFriends</p>
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
		const { friends } = this.props;

		return (
			<div className={classes.friendRoot}>
				<ExpansionPanel>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<div className={classes.friendColumn}>
							<p className={classes.friendHeading}>Friends</p>
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
		const { friends } = this.props;
		let friendCount = 0;
		 friends.map((friend) => {
			if (friend.status === "A" || friend.status === "P") {
				friendCount++;
			}
		});

		if (friendCount > 0) {
			return (
				<div className={classes.friendRoot}>
					{friends.map((friend) => {
						return this.returnMapFriend(friend);
					})}
				</div>
			);
		}
		return (
			<div className={classes.friendRoot}>
				<p className={classes.friendEmptyList}>Your friends list is empty</p>
			</div>
		);
	}

	render() {
		return (
			<div className={classes.friend}>
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

export default connect(mapStateToProps, { ...authActions, ...friendActions })((Friend));

