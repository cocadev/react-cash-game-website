import React, { Component } from 'react';

import { func } from "prop-types";

import { connect } from "react-redux";
import Tabs from "../../components/Tabs/Tabs";
import Friend from "../../containers/tabs/Friend/Friend";
import Sale from "../../containers/tabs/Sale/Sale";
import * as friendActions from "../../modules/friend/friend.actions";
import * as authActions from "../../modules/auth/auth.actions";
import * as saleActions from "../../modules/sale/sale.actions";


class HomePage extends Component {
	static propTypes = {
		getOffersSaga: func,
		listFriendsSaga: func,
		logoutStore: func
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
		const { tabsValue } = this.state;
		if (tabsValue.name === "Friends") {
			return (
				<Friend />
			);
		} else if (tabsValue.name === "Sale") {
			return (
				<Sale />
			);
		} else if (tabsValue.name === "Logout") {
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

export default connect(null, { ...authActions, ...friendActions, ...saleActions })((HomePage));
