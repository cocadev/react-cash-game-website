import React, { Component } from 'react';

import { func, array, object } from "prop-types";

import { connect } from "react-redux";

import SwipeableViews from 'react-swipeable-views';

import { withStyles } from "@material-ui/core/styles/index";
import Tabs from "../../components/Tabs/Tabs";
import Friend from "../../containers/tabs/Friend/Friend";
import Sale from "../../containers/tabs/Sale/Sale";
import Free from "../../containers/tabs/Free/Free";

import { loader } from "../../components/Loader/Loader";

import * as friendActions from "../../modules/friend/friend.actions";
import * as authActions from "../../modules/auth/auth.actions";
import * as saleActions from "../../modules/sale/sale.actions";

const styles = () => ({
	tabWrapper: {
		margin: "0 5px"
	},
	tabContentWrapper: {
	}
});


class HomePage extends Component {
	static propTypes = {
		classes: object,
		getOffersSaga: func,
		listFriendsSaga: func,
		logoutStore: func,
		offers: array,
		theme: object
	}

	state = {
		value: 0,
	};

	componentDidMount() {
		this.props.getOffersSaga();
		this.props.listFriendsSaga();

		loader.hide();
	}

	handleChange = (event, value) => {
		this.setState({ value });

		if (value === 3) {

			this.props.logoutStore();
		}
	};

	handleChangeIndex = (index) => {
		this.setState({ value: index });
	};


	mainTabChange = (value) => {
		this.setState({
			tabsValue: value
		});
	};

	render() {
		const { classes, theme, offers } = this.props;

		const { value } = this.state;

		const labels = [{ name: "Friends" }, { name: "Sale" }, { name: "Free" }, { name: "Logout" }];

		const saleProduct = [];
		const freeProduct = [];

		offers.map((offer) => {
			offer.price === 0 ? freeProduct.push(offer) : saleProduct.push(offer);
		});

		return (
			<div>
				<div className={classes.tabWrapper}>
					<Tabs
						value={value}
						mainTabChange={this.handleChange}
						labels={labels}
					/>
					<div className={classes.tabContentWrapper}>
						<SwipeableViews
							axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
							index={value}
							onChangeIndex={this.handleChangeIndex}
						>
							<Friend />
							<Sale offers={saleProduct} />
							<Free offers={freeProduct} showAddBlockNotification={value === 2} />
						</SwipeableViews>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ sale }) {
	return {
		offers: sale.offers
	};
}

export default connect(mapStateToProps, { ...authActions, ...friendActions, ...saleActions })((withStyles(styles,  { withTheme: true })(HomePage)));
