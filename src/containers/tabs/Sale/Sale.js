import React from 'react';
import { connect } from "react-redux";
import { object, array } from "prop-types";

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import * as saleActions from "../../../modules/sale/sale.actions";

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

	render() {
		const { classes, offers } = this.props;

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
									<Paper className={classes.root} elevation={1}>
										<h3>{ name }</h3>
										<p>{ description }</p>
										<p>{ price }</p>
									</Paper>
								</Grid>
							);
						})
					}
				</Grid>
			</div>
		);
	}
}

export default connect(null, { ...saleActions })((withStyles(styles,  { withTheme: true })(Sale)));

