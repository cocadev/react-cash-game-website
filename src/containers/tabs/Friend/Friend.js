import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { object, array, func } from "prop-types";

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
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
import withAnimation from "../../../hoc/animation";
import customTween from "../../../helpers/cutstomTween";

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
		alignItems: "center"
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

	constructor(props) {
		super(props);
		this.onLoadAnimation = React.createRef();
	}


	state = {
		linkBtnCollapsed: true
	}

	componentDidMount(){
		// const dots = [
		// 	{ y: 100, width: 10, x: 0, element: this.onLoadAnimation.current },
		// 	{ y: 80, width: 100, x: 0, element: this.onLoadAnimation.current },
		// 	{ y: 0, width: 100, x: 0, element: this.onLoadAnimation.current }
		// ];
		//
		// const time = 600;
		//
		// const update = ({ y, width, x, element }) => {
		// 	element.style.transform = `translateY(${y}%) translateX(${x}%)`;
		// 	element.style.width = `${width}%`;
		// };
		//
		// customTween(dots, time, update, this.onLoadAnimation.current);
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

	render() {
		const { classes } = this.props;

		return (
			<div ref={this.onLoadAnimation} hidden className={classes.mainWrapperContent}>
				{ this.renderLinkToFriend() }
				{ this.renderPendingFriends() }
				{ this.renderFriends() }
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

