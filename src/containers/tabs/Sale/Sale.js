import React from 'react';
import { connect } from "react-redux";
import { object, array } from "prop-types";

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import * as saleActions from "../../../modules/sale/sale.actions";

import SaleWidget from "../../../components/SaleWidget/SaleWidget";

const styles = () => ({
	root: {
		width: '100%',
		textAlign: "center",
		cursor: "pointer"
	},
});

class Sale extends React.Component {
	static propTypes = {
		classes: object,
		offers: array
	}

	state = {
		modalVisibility: false,
	}

	handleModalClose = () => {
		this.setState({ modalVisibility: false });
	};

	handleModalOpen = () => {
		this.setState({ modalVisibility: true });
	}

	render() {
		const { classes, offers } = this.props;

		const { modalVisibility } = this.state;

		return (
			<div>
				<Grid
					direction="row"
					container
					item
					lg={12} xs={10}
					spacing={24}
				>
					{
						offers.map((offer, index) => {
							const { name, description, price } = offer;

							return (
								<Grid key={index} lg={2} item xs={12}>
									<Paper onClick={this.handleModalOpen} className={classes.root} elevation={1}>
										<h3>{ name }</h3>
										<p>{ description }</p>
										<p>{ price }</p>
									</Paper>
								</Grid>
							);
						})
					}
				</Grid>

				<SaleWidget open={modalVisibility} onClose={this.handleModalClose} />
			</div>
		);
	}
}

export default connect(null, { ...saleActions })((withStyles(styles,  { withTheme: true })(Sale)));

