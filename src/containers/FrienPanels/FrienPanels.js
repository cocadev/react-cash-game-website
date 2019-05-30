import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { object, array, func } from "prop-types";

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import { api } from "../../config";

import * as authActions from "../../modules/auth/auth.actions";
import * as friendActions from "../../modules/friend/friend.actions";

const styles = () => ({
	root: {
		width: '100%',
		marginTop: '30px',
	},
	icon: {
		verticalAlign: 'bottom',
		height: 20,
		width: 20,
	},
	buttonMargin: {
		marginTop: '30px',
	},
	linkMargin: {
		marginTop: '20px',
		marginLeft: '20px',
	}
});

class FriendPanels extends React.Component {
	static propTypes = {
		classes: object,
		listFriendsSaga: func,
		userData: object
	}

	state = {
		linkBtnCollapsed: true
	}

	componentDidMount() {
		console.log(this.props);
		this.props.listFriendsSaga();
	}

	onLinkBtnClick = () => {
		this.setState({
			linkBtnCollapsed: !this.state.linkBtnCollapsed
		});
	}

	renderLinkToFriend = () => {
		const { classes, userData } = this.props;

		const { linkBtnCollapsed } = this.state;

		const linkText = `${api.urls.currentPath}${userData.invite_code}`;

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
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<ExpansionPanel>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<div className={classes.column}>
							<Typography className={classes.heading}>PendingFriends</Typography>
						</div>
					</ExpansionPanelSummary>
					<Divider />

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
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<ExpansionPanel>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<div className={classes.column}>
							<Typography className={classes.heading}>Friends</Typography>
						</div>
					</ExpansionPanelSummary>
					<Divider />

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
function mapStateToProps({ auth }) {
	return {
		userData: auth.userData
	};
}

export default connect(mapStateToProps, { ...authActions, ...friendActions })((withStyles(styles,  { withTheme: true })(FriendPanels)));

