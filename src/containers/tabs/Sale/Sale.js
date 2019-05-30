import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { object, array, func, bool } from "prop-types";

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import * as saleActions from "../../../modules/sale/sale.actions";

import SaleWidget from "../../../components/SaleWidget/SaleWidget";

import Free from "../../../containers/tabs/Free/Free";

const styles = () => ({
	root: {
		width: '100%',
		textAlign: "center",
		cursor: "pointer"
	},
	mainWrapperContent: {
		margin: "20px 0 0 0",
		width: "100%",
		minHeight: "calc(100vh - 112px)",
		animation: "unset"
	}
});

class Sale extends React.Component {
	static propTypes = {
		classes: object,
		googleVideoErrorStatus: bool,
		offers: array,
		onVideoPlay: func
	}

	state = {
		payTabsVisibility: false,
		selectedItem: false,
	}

	handlePayTabsClose = () => {
		this.setState({ payTabsVisibility: false, selectedItem: false });
	};

	handlePayTabsOpen = (index) => () => {
		if (this.state.selectedItem || this.state.selectedItem === 0) {
			this.handlePayTabsClose();
		} else {
			this.setState({ payTabsVisibility: true, selectedItem: index });
		}
	}

	renderSelectedItem = (offer, index) => {
		const { classes } = this.props;

		const { selectedItem } = this.state;

		const { name, description, price } = offer;

		return (
			<Fragment key={index}>
				{ (!selectedItem && selectedItem !== 0) &&
					<Grid key={index} lg={2} item xs={12}>
						<Paper onClick={this.handlePayTabsOpen(index)} className={classes.root} elevation={1}>
							<h3>{ name }</h3>
							<p>{ description }</p>
							<p>{ price }</p>
						</Paper>
					</Grid>
				}

				{ selectedItem === index &&
					<Grid key={index} lg={2} item xs={12}>
						<Paper onClick={this.handlePayTabsOpen(index)} className={classes.root} elevation={1}>
							<h3>{ name }</h3>
							<p>{ description }</p>
							<p>{ price }</p>
						</Paper>
					</Grid>
				}
			</Fragment>
		);
	}

	render() {
		const { classes, offers, googleVideoErrorStatus } = this.props;

		const { payTabsVisibility } = this.state;

		const saleProduct = [];
		const freeProduct = [];

		offers.map((offer) => {
			offer.price === 0 ? freeProduct.push(offer) : saleProduct.push(offer);
		});

		return (
			<Fragment>
				<div className={classes.mainWrapperContent}>
					<Grid
						direction="row"
						container
						item
						lg={12} xs={10}
						spacing={24}
					>
						{
							saleProduct.map((offer, index) => {
								return this.renderSelectedItem(offer, index);
							})
						}
					</Grid>
					{ payTabsVisibility ?
						<SaleWidget onClose={this.handlePayTabsClose} />
						:
						<>
							<h1>Free</h1>
							<Free onVideoPlay={this.props.onVideoPlay} googleVideoErrorStatus={googleVideoErrorStatus} offers={freeProduct} />
						</>
					}
				</div>

			</Fragment>
		);
	}
}

export default connect(null, { ...saleActions })((withStyles(styles,  { withTheme: true })(Sale)));

