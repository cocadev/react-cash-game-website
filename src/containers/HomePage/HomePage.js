import React, { Component, Fragment } from 'react';

import { func, array, object } from "prop-types";

import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles/index";
import Tabs from "../../components/Tabs/Tabs";
import Friend from "../../containers/tabs/Friend/Friend";
import Sale from "../../containers/tabs/Sale/Sale";
import Free from "../../containers/tabs/Free/Free";

import CutCorners from "../../components/CutCorners/CutCorners";
import { cutCorners } from "../../helpers/cutCorners";

import * as friendActions from "../../modules/friend/friend.actions";
import * as authActions from "../../modules/auth/auth.actions";
import * as saleActions from "../../modules/sale/sale.actions";

const styles = () => ({
	tabWrapper: {
		margin: "0 5px"
	},
	tabContentWrapper: {
		display: "flex",
		justifyContent: "flex-end",
	}
});


class HomePage extends Component {
	static propTypes = {
		classes: object,
		getOffersSaga: func,
		listFriendsSaga: func,
		logoutStore: func,
		offers: array
	}

	state = {
		tabsValue: {
			index: false,
			name: ""
		}
	};

	componentDidMount() {
		this.props.getOffersSaga();
		this.props.listFriendsSaga();
	}

	mainTabChange = (value) => {
		this.setState({
			tabsValue: value
		});
	};

	renderTabsContent = () => {
		const { offers } = this.props;

		const { tabsValue } = this.state;
		const saleProduct = [];
		const freeProduct = [];

		offers.map((offer) => {
			offer.price === 0 ? freeProduct.push(offer) : saleProduct.push(offer);
		});

		switch (tabsValue.name) {
			case "Friends":
				return (<Friend />);
			case "Sale":
				return (<Sale offers={saleProduct} />);
			case "Free":
				return (<Free offers={freeProduct} />);
			case "Logout":
				this.props.logoutStore();
		}
	}


	render() {
		const { classes } = this.props;

		const { tabsValue } = this.state;

		const labels = [{ name: "Friends" }, { name: "Sale" }, { name: "Free" }, { name: "Logout" }];

		return (
			<div>
				<div className={classes.tabWrapper}>
					<CutCorners clipStyle={cutCorners(1, 15)}>
						<Tabs
							customStyle={cutCorners(1, 15)}
							value={tabsValue}
							mainTabChange={this.mainTabChange}
							labels={labels}
						/>
					</CutCorners>
				</div>
				<div className={classes.tabContentWrapper}>
					{ this.renderTabsContent() }
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
