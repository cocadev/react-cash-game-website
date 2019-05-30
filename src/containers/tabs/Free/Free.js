import React from 'react';
import { connect } from "react-redux";
import { object, array, bool, func } from "prop-types";

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
	polifishBtn: {
		cursor: "pointer",
		zIndex: "9",
		display: "block",
		position: "fixed",
		bottom: "40px",
		right: "0px",
	},
	mainWrapperContent: {
		width: "100%",
	}
});


class Free extends React.Component {
	static propTypes = {
		classes: object,
		offers: array,
		onVideoPlay: func,
	}
	constructor(props) {
		super(props);
		this.onLoadAnimation = React.createRef();
	}

	state = {
		googleSDKObj: null,
		videoAddStatus: "",
		contentElement: null,
		adContainer: null,
		googleError: false,
	}

	onPolifishBtnClick = (name) => () => {
		if (name  === "Survey") {
			Pollfish.showFullSurvey();
		}
		if (name === "Video") {
			this.props.onVideoPlay();
		}
	}

	render() {
		const { classes, offers } = this.props;

		return (
			<div className={classes.mainWrapperContent}>
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
									<Paper onClick={this.onPolifishBtnClick(name)} className={classes.root} elevation={1}>
										<h3>{ name }</h3>
										<p>{ description }</p>
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

export default connect(null, { ...saleActions })((withStyles(styles,  { withTheme: true })(Free)));

