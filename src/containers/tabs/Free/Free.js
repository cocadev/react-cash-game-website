import React from 'react';
import { connect } from "react-redux";
import { object, array } from "prop-types";

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import * as saleActions from "../../../modules/sale/sale.actions";

const styles = () => ({
	root: {
		width: '100%',
		textAlign: "center"
	},
	polifishBtn: {
		cursor: "pointer",
		zIndex: "9",
		display: "block",
		position: "fixed",
		bottom: "40px",
		right: "0px",
	}
});

class Free extends React.Component {
	static propTypes = {
		classes: object,
		offers: array
	}
	onPolifishBtnClick = () => {
		Pollfish.showFullSurvey();
	}

	render() {
		const { classes, offers } = this.props;

		return (
			<div className={classes.root}>

				<Grid
					direction="row"
					container
					item
					lg={12} xs={10}
					spacing={24}
				>
					{
						offers.map((offer, index) => {
							const { name, description } = offer;

							return (
								<Grid key={index} lg={2} item xs={12}>
									<Paper className={classes.root} elevation={1}>
										<h3>{ name }</h3>
										<p>{ description }</p>
									</Paper>
								</Grid>
							);
						})
					}
				</Grid>

				<Button onClick={this.onPolifishBtnClick} variant="fab" color="primary" aria-label="Add" className={classes.polifishBtn}>
					<AddIcon />
				</Button>
			</div>
		);
	}
}

export default connect(null, { ...saleActions })((withStyles(styles,  { withTheme: true })(Free)));

