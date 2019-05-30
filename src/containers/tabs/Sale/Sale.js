import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { array, func, bool } from "prop-types";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import * as saleActions from "../../../modules/sale/sale.actions";

import SaleWidget from "../../../components/SaleWidget/SaleWidget";

import Free from "../../../containers/tabs/Free/Free";

import classes from "./Sale.less";


class Sale extends React.Component {
	static propTypes = {
		googleVideoErrorStatus: bool,
		offers: array,
		onVideoPlay: func,
		changeScrollTabHeight: func
	}

	state = {
		payTabsVisibility: false,
		selectedItem: false,
	}

	handlePayTabsClose = () => {
		this.setState({ payTabsVisibility: false, selectedItem: false });

		/**
		 * changes the tab height
		 */
		this.props.changeScrollTabHeight();
	}

	handlePayTabsOpen = (index) => () => {
		if (this.state.selectedItem || this.state.selectedItem === 0) {
			this.handlePayTabsClose();
		} else {
			this.setState({ payTabsVisibility: true, selectedItem: index });
		}

		/**
		 * changes the tab height
		 */
		this.props.changeScrollTabHeight();
	}

	renderSelectedItem = (offer, index) => {
		const { selectedItem } = this.state;

		const { name, description, price } = offer;
		return (
			<Fragment key={index}>
				{ (!selectedItem && selectedItem !== 0) &&
					<Grid key={index} lg={2} item xs={12}>
						<Paper onClick={this.handlePayTabsOpen(index)} className={classes.saleRoot} elevation={1}>
							<h3>{ name }</h3>
							<p>{ description }</p>
							<p>{ price }</p>
						</Paper>
					</Grid>
				}

				{ selectedItem === index &&
					<Grid key={index} lg={2} item xs={12}>
						<Paper onClick={this.handlePayTabsOpen(index)} className={classes.saleRoot} elevation={1}>
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
		const { offers, googleVideoErrorStatus } = this.props;

		const { payTabsVisibility } = this.state;

		const saleProduct = [];
		const freeProduct = [];

		offers.map((offer) => {
			offer.price === 0 ? freeProduct.push(offer) : saleProduct.push(offer);
		});


		return (
			<Fragment>
				<div className={classes.sale}>
					<Grid
						className={classes.saleMainContent}
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
							<h1 className={classes.saleTextCenter}>Free</h1>
							<Free changeScrollTabHeight={this.props.changeScrollTabHeight} onVideoPlay={this.props.onVideoPlay} googleVideoErrorStatus={googleVideoErrorStatus} offers={freeProduct} />
						</>
					}
				</div>

			</Fragment>
		);
	}
}

export default connect(null, { ...saleActions })((Sale));

