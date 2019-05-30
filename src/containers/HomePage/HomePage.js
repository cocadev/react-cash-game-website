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

import MobileMenu from "../../components/MobileMenu/MobileMenu";
import LogoutButton from "../../components/Buttons/LogoutButton/LogoutButton";
import MenuButton from "../../components/Buttons/MenuButton/MenuButton";

import * as friendActions from "../../modules/friend/friend.actions";
import * as authActions from "../../modules/auth/auth.actions";
import * as saleActions from "../../modules/sale/sale.actions";
import * as winnersActions from "../../modules/winners/winners.actions";
import { cutCorners } from "../../helpers/cutCorners";
import history from "../../modules/history";

import classes from "./HomePage.less";


class HomePage extends Component {
	static propTypes = {
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
		videoPlayStatus: false,
		googleVideoErrorStatus: true,
		isMobileMenuOpen: false
	};

	componentDidMount() {
		const { getOffersSaga, listFriendsSaga, fetchBonus, location } = this.props;

		const tabHref = ["sale", "winners", "friends", "loot"];
		getOffersSaga();
		listFriendsSaga();

		setTimeout(() => {
			fetchBonus();
		}, 86400000);

		// for tab redirected with href
		if (location.hash !== "/" && location.hash) {
			tabHref.map((tab, index) => {
				if (`#${tab}` === location.hash) {
					this.setState({
						tabIndexValue: index,
						lootBoxVisibility: false
					});
				}
			});
		}

		// this.props.fetchWinnersSaga();

		loader.hide();
	}

	handleChange = (event, value) => {
		this.lootBoxHide();

		this.setState({ tabIndexValue: value });
		const tabHref = ["sale", "winners", "friends", "loot"];
		history.push(`/#${tabHref[value]}`);
	};

	handleChangeIndex = (index) => {
		this.setState({ tabIndexValue: index });
	};

	lootBoxShow = () => {
		this.setState({
			tabIndexValue: false,
			lootBoxVisibility: true
		});
		//change hash name on main rout
		history.push(`/`);
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
	/**
	 * handleMenuClick (works only on mobile)
	 */
	onMobileMenuClick = () => {
		this.setState({
			isMobileMenuOpen: !this.state.isMobileMenuOpen
		});
	}

	omMobileMenuClose = () => {
		this.setState({
			isMobileMenuOpen: false
		});
	}

	googleVideoErrorStatusChange = (status) => {
		this.setState({
			googleVideoErrorStatus: status
		});
	}

	render() {
		const { theme, offers, userData } = this.props;

		const {
			tabIndexValue,
			lootBoxVisibility,
			videoPlayStatus,
			googleVideoErrorStatus,
			isMobileMenuOpen
		} = this.state;

		const labels = [{ name: "Sale" }, { name: "Winners" }, { name: "Friends" },  { name: "Loot" }];

		return (
			<div className={classes.homePage}>

				<MenuButton isMobileMenuOpen={this.state.isMobileMenuOpen} onMobileMenuClick={this.onMobileMenuClick} />

				<div className={classes.homePageTopElementWrapper}>
					<UserWidget
						lootBoxShow={this.lootBoxShow}
						imgSrc={userData.picture}
						coins={userData.FUN_balance}
						name={userData.screen_name}
					/>
				</div>

				<LootBox lootBoxVisibility={lootBoxVisibility}  />

				<MobileMenu
					handleItemMenuClick={this.handleChange}
					closeMenu={this.omMobileMenuClose}
					isMobileMenuOpen={isMobileMenuOpen}
				/>

				{ tabIndexValue !== false &&
					<div className={classes.homePageOpenLootCenterBtnWrapper}>
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

				<div className={classes.homePageTabWrapper}>
					<Tabs
						value={tabIndexValue}
						onChange={this.handleChange}
						className={classes.homePageTabCenter}
						labels={labels}
					/>
					<div className={classes.homePageTabContentWrapper}>
						{ tabIndexValue !== false &&
							<SwipeableViews
								disabled
								slideClassName={classes.homePageOverFlowHidden}
								axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
								index={tabIndexValue}
								onChangeIndex={this.handleChangeIndex}
							>
								<Sale
									onVideoPlay={this.onVideoPlay}
									googleVideoErrorStatus={googleVideoErrorStatus}
									offers={offers}
								/>
								<h1>Winners</h1>
								<Friend />
								<h1>Loot</h1>
							</SwipeableViews>
						}
					</div>

					<VideSDKWrapper
						videoPlayStatus={videoPlayStatus}
						googleVideoErrorStatusChange={this.googleVideoErrorStatusChange}
						onVideoFinish={this.onVideoFinish}
						showAddBlockNotification={tabIndexValue === 2}
						googleVideoErrorStatus={googleVideoErrorStatus}
					/>

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

export default connect(mapStateToProps, { ...authActions, ...friendActions, ...saleActions, ...winnersActions })((withStyles(null,  { withTheme: true })(HomePage)));

