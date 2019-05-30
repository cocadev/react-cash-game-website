import React, { Component } from 'react';

import { func, array, object, any, bool } from "prop-types";

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
import Menus from "../../containers/Menus/Menus";

import LogoutButton from "../../components/Buttons/LogoutButton/LogoutButton";
import MenuButton from "../../components/Buttons/MenuButton/MenuButton";

import SaleIcon from "../../images/icons/shop.png";
import WinnersIcon from "../../images/icons/dollar.png";
import FriendsIcon from "../../images/icons/friends.png";
import LootIcon from "../../images/icons/booxIcon.png";

import Logo from "../../images/icons/lootBoxLogo.png";

import * as friendActions from "../../modules/friend/friend.actions";
import * as authActions from "../../modules/auth/auth.actions";
import * as saleActions from "../../modules/sale/sale.actions";
import * as winnersActions from "../../modules/winners/winners.actions";
import * as menusActions from "../../modules/menus/menus.actions";
import { cutCorners } from "../../helpers/cutCorners";
import history from "../../modules/history";

import classes from "./HomePage.less";

import 'odometer/themes/odometer-theme-car.css';


class HomePage extends Component {
	constructor(props) {
		super(props);
		this.myRef = React.createRef();
	}

	static propTypes = {
		fetchBonus: func,
		fetchWinnersSaga: func,
		getOffersSaga: func,
		hideLootBox: func,
		listFriendsSaga: func,
		logoutStorePending: func,
		lootBoxVisibility: bool,
		offers: array,
		setTabIndex: func,
		showLootBox: func,
		showMenu: func,
		tabIndex: any,
		theme: object,
		userData: object,
	}

	state = {
		videoPlayStatus: false,
		googleVideoErrorStatus: true,
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
					this.props.hideLootBox();

					this.props.setTabIndex(index);
				}
			});
		}



		// this.props.fetchWinnersSaga();
		loader.hide();
	}

	componentDidUpdate() {
		this.changeScrollTabHeight();
	}

	handleChange = (event, value) => {
		this.lootBoxHide();

		this.props.setTabIndex(value);

		// this.setState({ tabIndexValue: value });
		const tabHref = ["sale", "winners", "friends", "loot"];
		history.push(`/#${tabHref[value]}`);
	};

	handleChangeIndex = (index) => {
		this.props.setTabIndex(index);
		// this.setState({ tabIndexValue: index });
	};

	lootBoxShow = () => {
		this.props.showLootBox();

		this.props.setTabIndex(false);
		//change hash name on main rout
		history.push(`/`);
	}

	lootBoxHide = () => {
		this.props.hideLootBox();
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
		this.props.showMenu("main");
	}

	omMobileMenuClose = () => {
		this.setState({
			isMobileMenuOpen: false
		});
	}

	/**
	 * open profile menu
	 */
	onProfileShow = () => {
		this.props.showMenu("profile");
	}

	googleVideoErrorStatusChange = (status) => {
		this.setState({
			googleVideoErrorStatus: status
		});
	}
	/**
	* sets  new tab height change, need call when height will change
	*/
	changeScrollTabHeight = () => {
		if (this.swipeableActions) {
			this.swipeableActions.updateHeight();

			//console.dir(this.myRef.current);
			// console.dir(this.myRef.current.containerNode.clientHeight);
			//this.myRef.current.containerNode.style.height = `${this.myRef.current.containerNode.clientHeight + 5}px`;
		}
	}

	render() {
		const { theme, offers, userData, tabIndex, lootBoxVisibility } = this.props;

		const {
			videoPlayStatus,
			googleVideoErrorStatus
		} = this.state;

		const labels = [
			{ name: "Sale", icon: SaleIcon, iconStyle: { color: "#d4ab0f", letterSpacing: "2px"  } },
			{ name: "Winners", icon: WinnersIcon, iconStyle: { color: "#8ea218", letterSpacing: "2px" } },
			{ name: "Friends", icon: FriendsIcon, iconStyle: { color: "#6aa3de", letterSpacing: "2px" } },
			{ name: "Loot", icon: LootIcon, iconStyle: { color: "#dd1c4c", letterSpacing: "2px" } }
		];

		return (
			<div className={classes.homePage}>

				<div className={classes.homePageTopElementWrapper}>

					<MenuButton onClick={this.onMobileMenuClick} />

					<UserWidget
						lootBoxShow={this.lootBoxShow}
						imgSrc={userData.picture}
						coins={userData.FUN_balance}
						name={userData.screen_name}
						onProfileShow={this.onProfileShow}
					/>
				</div>

				<img src={Logo} alt="logo" className={classes.homePageLogo} />

				<Menus />

				{ tabIndex !== false &&
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
						value={tabIndex}
						onChange={this.handleChange}
						className={classes.homePageTabCenter}
						labels={labels}
						customstyle={{ alignItems: "center" }}
					/>

					<LootBox lootBoxVisibility={lootBoxVisibility}  />

					{/*<button onClick={this.changeScrollTabHeight}>check</button>*/}

					<div className={classes.homePageTabContentWrapper}>
						{ tabIndex !== false &&
							<>
								<SwipeableViews
									action={(actions) => {
										this.swipeableActions = actions;
									}}
									animateHeight
									disabled
									ref={this.myRef}
									slideClassName={classes.homePageOverFlowHidden}
									axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
									index={tabIndex}
									onChangeIndex={this.handleChangeIndex}
								>
									<Sale
										changeScrollTabHeight={this.changeScrollTabHeight}
										onVideoPlay={this.onVideoPlay}
										googleVideoErrorStatus={googleVideoErrorStatus}
										offers={offers}
									/>
									<div className={classes.homePageTabMinHeight}>
										<h1>Winners</h1>
									</div>
									<Friend />
									<div className={classes.homePageTabMinHeight}>
										<h1>Loot</h1>
									</div>
								</SwipeableViews>
							</>
						}
					</div>

					<VideSDKWrapper
						videoPlayStatus={videoPlayStatus}
						googleVideoErrorStatusChange={this.googleVideoErrorStatusChange}
						onVideoFinish={this.onVideoFinish}
						showAddBlockNotification={tabIndex === 2}
						googleVideoErrorStatus={googleVideoErrorStatus}
					/>

					<LogoutButton logout={this.props.logoutStorePending} />
				</div>
			</div>
		);
	}
}

function mapStateToProps({ sale, auth, menus }) {
	return {
		offers: sale.offers,
		userData: auth.userData,
		tabIndex: menus.tabIndex,
		lootBoxVisibility: menus.lootBoxVisibility
	};
}

export default connect(mapStateToProps, { ...authActions, ...friendActions, ...saleActions, ...winnersActions, ...menusActions })((withStyles(null,  { withTheme: true })(HomePage)));

