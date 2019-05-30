import React, { Component } from 'react';

import { func, array, object } from "prop-types";

import { connect } from "react-redux";

import SwipeableViews from 'react-swipeable-views';

import { withStyles } from "@material-ui/core/styles/index";
import Button from '@material-ui/core/Button';
import Tabs from "../../components/Tabs/Tabs";
import Friend from "../../containers/tabs/Friend/Friend";
import Sale from "../../containers/tabs/Sale/Sale";
import Free from "../../containers/tabs/Free/Free";

import { loader } from "../../components/Loader/Loader";
import UserWidget from "../../components/UserWidget/UserWidget";
import CutCorners from "../../components/CutCorners/CutCorners";
import LootBox from "../../components/LootBox/LootBox";

import * as friendActions from "../../modules/friend/friend.actions";
import * as authActions from "../../modules/auth/auth.actions";
import * as saleActions from "../../modules/sale/sale.actions";
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
	openLootBoxBtnWrapper: {
		position: "fixed",
		bottom: "30px",
		right: "30px",
		cursor: "pointer",
		zIndex: "2"
	}
});


class HomePage extends Component {
	static propTypes = {
		classes: object,
		getOffersSaga: func,
		listFriendsSaga: func,
		logoutStore: func,
		offers: array,
		theme: object,
		userData: object
	}

	state = {
		tabIndexValue: false,
		lootBoxVisibility: false
	};

	componentDidMount() {
		this.props.getOffersSaga();
		this.props.listFriendsSaga();

		loader.hide();
	}

	handleChange = (event, value) => {
		if (value === 3) {
			this.props.logoutStore();
		}else {
			this.lootBoxHide();
			this.setState({ tabIndexValue: value })
		}
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

	render() {
		const { classes, theme, offers, userData } = this.props;

		const { tabIndexValue, lootBoxVisibility } = this.state;

		const labels = [{ name: "Friends" }, { name: "Sale" }, { name: "Free" }, { name: "Logout" }];

		const saleProduct = [];
		const freeProduct = [];

		offers.map((offer) => {
			offer.price === 0 ? freeProduct.push(offer) : saleProduct.push(offer);
		});

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
					<div className={classes.openLootBoxBtnWrapper}>
						<CutCorners clipStyle={cutCorners(7.5, 15)}>
							<Button
								onClick={this.lootBoxShow}
								color="primary"
								style={cutCorners(7.5, 15)}
								variant="contained"
							>
								<span>Open LootBox</span>
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
								axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
								index={tabIndexValue}
								onChangeIndex={this.handleChangeIndex}
							>
								<Friend />
								<Sale offers={saleProduct} />
								<Free offers={freeProduct} showAddBlockNotification={tabIndexValue === 2} />
							</SwipeableViews>
						}
					</div>
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

export default connect(mapStateToProps, { ...authActions, ...friendActions, ...saleActions })((withStyles(styles,  { withTheme: true })(HomePage)));
