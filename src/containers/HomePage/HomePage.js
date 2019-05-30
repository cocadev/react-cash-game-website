import React, { Component } from 'react';

import { func, array, object } from "prop-types";

import { connect } from "react-redux";

import SwipeableViews from 'react-swipeable-views';

import { withStyles } from "@material-ui/core/styles/index";
import Button from '@material-ui/core/Button';
import GiftBtn from '@material-ui/icons/CardGiftcard';

import Tabs from "../../components/Tabs/Tabs";
import Friend from "../../containers/tabs/Friend/Friend";
import Sale from "../../containers/tabs/Sale/Sale";
import VideSDKWrapper from "../../components/VideSDKWrapper/VideSDKWrapper";

import { loader } from "../../components/Loader/Loader";
import UserWidget from "../../components/UserWidget/UserWidget";
import CutCorners from "../../components/CutCorners/CutCorners";
import LootBox from "../../components/LootBox/LootBox";
import LogoutButton from "../../components/LogoutButton/LogoutButton";

import * as friendActions from "../../modules/friend/friend.actions";
import * as authActions from "../../modules/auth/auth.actions";
import * as saleActions from "../../modules/sale/sale.actions";
import * as winnersActions from "../../modules/winners/winners.actions";
import { cutCorners } from "../../helpers/cutCorners";

const styles = () => ({
	tabWrapper: {
		margin: "0 5px"
	},
	tabContentWrapper: {
	},
	tabCenter: {
		display: "flex",
		justifyContent: "center",
		marginTop: "20px",
	},
	openLootCenterBtnWrapper: {
		position: "fixed",
		bottom: "15px",
		left: "50%",
		cursor: "pointer",
		zIndex: "2",
		transform: "translate(-50%, -50%)"
	},
	overFlowHidden: {
		overflow: "hidden !important"
	}
});


class HomePage extends Component {
	static propTypes = {
		classes: object,
		fetchBonus: func,
		fetchWinnersSaga: func,
		getOffersSaga: func,
		listFriendsSaga: func,
		logoutStorePending: func,
		offers: array,
		theme: object,
		userData: object
	}

	state = {
		tabIndexValue: false,
		lootBoxVisibility: true,
		videoPlayStatus: false
	};

	componentDidMount() {
		this.props.getOffersSaga();
		this.props.listFriendsSaga();

		setTimeout(() => {
			this.props.fetchBonus();
		}, 86400000);

		// this.props.fetchWinnersSaga();

		loader.hide();
	}

	handleChange = (event, value) => {
		this.lootBoxHide();
		this.setState({ tabIndexValue: value });
	};

	handleChangeIndex = (index) => {
		this.setState({ tabIndexValue: index });
	};

	lootBoxShow = () => {
		this.setState({
			tabIndexValue: false,
			lootBoxVisibility: true
		});
	}

	lootBoxHide = () => {
		this.setState({
			lootBoxVisibility: false
		});
	}

	mainTabChange = (value) => {
		this.setState({
			tabsValue: value
		});
	};

	onVideoPlay = () => {
		this.setState({
			videoPlayStatus: true
		});
	}

	onVideoFinish = () => {
		this.setState({
			videoPlayStatus: false
		});
	}

	render() {
		const { classes, theme, offers, userData } = this.props;

		const { tabIndexValue, lootBoxVisibility, videoPlayStatus } = this.state;

		const labels = [{ name: "Sale" }, { name: "Winners" }, { name: "Friends" },  { name: "Loot" }];

		return (
			<div>
				<UserWidget
					lootBoxShow={this.lootBoxShow}
					imgSrc={userData.picture}
					coins={userData.FUN_balance}
					name={userData.screen_name}
				/>
				<LootBox lootBoxVisibility={lootBoxVisibility}  />

				{ tabIndexValue !== false &&
				<div className={classes.openLootCenterBtnWrapper}>
					<CutCorners clipStyle={cutCorners(7.5, 15)}>
						<Button
							onClick={this.lootBoxShow}
							color="primary"
							style={cutCorners(7.5, 15)}
							variant="contained"
						>
							<GiftBtn />
						</Button>
					</CutCorners>
				</div>
				}

				<div className={classes.tabWrapper}>
					<Tabs
						value={tabIndexValue}
						onChange={this.handleChange}
						className={classes.tabCenter}
						labels={labels}
					/>
					<div className={classes.tabContentWrapper}>
						{ tabIndexValue !== false &&
							<SwipeableViews
								slideClassName={classes.overFlowHidden}
								axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
								index={tabIndexValue}
								onChangeIndex={this.handleChangeIndex}
							>
								<Sale onVideoPlay={this.onVideoPlay} offers={offers} />
								<h1>Winners</h1>
								<Friend />
								<h1>Loot</h1>
							</SwipeableViews>
						}
					</div>

					<VideSDKWrapper videoPlayStatus={videoPlayStatus} onVideoFinish={this.onVideoFinish} showAddBlockNotification={tabIndexValue === 2} />

					<LogoutButton logout={this.props.logoutStorePending} />
				</div>
			</div>
		);
	}
}

function mapStateToProps({ sale, auth }) {
	return {
		offers: sale.offers,
		userData: auth.userData
	};
}

export default connect(mapStateToProps, { ...authActions, ...friendActions, ...saleActions, ...winnersActions })((withStyles(styles,  { withTheme: true })(HomePage)));
