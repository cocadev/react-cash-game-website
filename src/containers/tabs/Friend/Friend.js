import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { object, array, func } from "prop-types";

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import Person from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import * as authActions from "../../../modules/auth/auth.actions";
import * as friendActions from "../../../modules/friend/friend.actions";

const styles = () => ({
	root: {
		width: '100%',
		marginTop: '30px',
	},
	buttonMargin: {
		marginTop: '30px',
	},
	linkMargin: {
		marginTop: '20px',
		marginLeft: '20px',
	},
	singleFriendWrapper: {
		display: "flex",
		padding: "10px",
		alignItems: "center"
	}
});

class Friend extends React.Component {
	static propTypes = {
		acceptFriendSaga: func,
		removeFriendSaga: func,
		classes: object,
		friends: array,
		listFriendsSaga: func,
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

	onAddToFriendBtnClick = (id) => (event) => {
		event.stopPropagation();

		this.props.acceptFriendSaga(id);
	}

	onDeleteBtnClick = (id) => (event) => {
		event.stopPropagation();
		this.props.removeFriendSaga(id);
	}

	returnMapFriend = (friend, statusRender) => {
		const { classes } = this.props;

		const { status, id, screen_name, picture } = friend;
		if (status === statusRender) {
			return (
				<div className={classes.singleFriendWrapper} key={id}>
					<div>
						{
							picture !== "" ?
								<img src={picture} alt="" />
								:
								<Avatar>
									<Person />
								</Avatar>
						}
						{ screen_name }
					</div>
					<div>
						{
							status === "P" &&
							<button onClick={this.onAddToFriendBtnClick(id)}> Add To Friend</button>
						}

						{
							status === "A" &&
							<button onClick={this.onDeleteBtnClick(id)}> Delete </button>
						}
					</div>
				</div>
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
					onClick={this.onLinkBtnClick}
					color={linkBtnCollapsed ? "primary" : "secondary"}
					className={classes.buttonMargin}
				>
					<Fragment>
						{ linkBtnCollapsed ?
							<span>Show Link</span> :
							<span>Hide Link</span>
						}
					</Fragment>
				</Button>

				{ !linkBtnCollapsed &&
					<Typography className={classes.linkMargin}>{ linkText }</Typography>
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
							<Typography className={classes.heading}>PendingFriends</Typography>
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
							<Typography className={classes.heading}>Friends</Typography>
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

	render() {
		return (
			<Fragment>
				{ this.renderLinkToFriend() }
				{ this.renderPendingFriends() }
				{ this.renderFriends() }
			</Fragment>
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

