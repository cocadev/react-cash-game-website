import React, { Component } from 'react';

import { func, array } from "prop-types";

import { connect } from "react-redux";
import Tabs from "../../components/Tabs/Tabs";
import Friend from "../../containers/tabs/Friend/Friend";
import Sale from "../../containers/tabs/Sale/Sale";
import Free from "../../containers/tabs/Free/Free";

import * as friendActions from "../../modules/friend/friend.actions";
import * as authActions from "../../modules/auth/auth.actions";
import * as saleActions from "../../modules/sale/sale.actions";


class HomePage extends Component {
	static propTypes = {
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
				return <Friend />;
			case "Sale":
				return <Sale offers={saleProduct} />;
			case "Free":
				return <Free offers={freeProduct} />;
			case "Logout":
				this.props.logoutStore();
		}
	}


	render() {
		const { tabsValue } = this.state;

		const labels = [{ name: "Friends" }, { name: "Sale" }, { name: "Free" }, { name: "Logout" }];

		return (
			<div>
				<Tabs value={tabsValue} mainTabChange={this.mainTabChange} labels={labels} />

				{ this.renderTabsContent() }
			</div>
		);
	}
}

function mapStateToProps({ sale }) {
	return {
		offers: sale.offers
	};
}

export default connect(mapStateToProps, { ...authActions, ...friendActions, ...saleActions })((HomePage));
