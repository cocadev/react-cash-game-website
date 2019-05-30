import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { object, array, func } from "prop-types";

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';

import Tabs from "../../../components/Tabs/Tabs";

import * as saleActions from "../../../modules/sale/sale.actions";

const styles = () => ({
	root: {
		width: '100%',
		margin: "30px auto 0 auto"
	},
});

class Sale extends React.Component {
	static propTypes = {
		classes: object,
		getOffersSaga: func,
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
	}

	mainTabChange = (value) => {
		this.setState({
			tabsValue: value
		});
	};

	render() {
		const { classes } = this.props;

		const { tabsValue } = this.state;

		const labels = [{ name: "Cost" }, { name: "Free" }];

		return (
			<div className={classes.root}>
				<Tabs value={tabsValue} mainTabChange={this.mainTabChange} labels={labels} />
			</div>
		);
	}
}
function mapStateToProps({ sale }) {
	return {
		offers: sale.offers
	};
}

export default connect(mapStateToProps, { ...saleActions })((withStyles(styles,  { withTheme: true })(Sale)));

