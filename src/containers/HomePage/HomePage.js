import React, { Component } from 'react';

import Tabs from "../../components/Tabs/Tabs";
import FriendPanels from "../../containers/FrienPanels/FrienPanels";


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

	renderFriendsContent = () => {
		const { tabsValue } = this.state;
		if (tabsValue.name === "Friends") {
			return (
				<FriendPanels />
			);
		}
	}

	render() {
		const { tabsValue } = this.state;

		return (
			<div>
				<Tabs value={tabsValue} mainTabChange={this.mainTabChange} />

				{ this.renderFriendsContent() }
			</div>
		);
	}
}

export default HomePage;
