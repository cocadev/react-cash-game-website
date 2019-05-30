import React, { Component } from 'react';

import Tabs from "../../components/Tabs/Tabs";
import Friend from "../../containers/tabs/Friend/Friend";
import Sale from "../../containers/tabs/Sale/Sale";


class HomePage extends Component {
	state = {
		tabsValue: {
			index: false,
			name: ""
		}
	};

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
		}
	}


	render() {
		const { tabsValue } = this.state;

		const labels = [{ name: "Friends" }, { name: "Sale" }];

		return (
			<div>
				<Tabs value={tabsValue} mainTabChange={this.mainTabChange} labels={labels} />

				{ this.renderTabsContent() }
			</div>
		);
	}
}

export default HomePage;
