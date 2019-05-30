import React from 'react';
import { connect } from "react-redux";
import { object, array, bool, func } from "prop-types";

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import classNames from "classnames";

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
	},
	mainContent: {
		display: "flex",
		justifyContent: "center"
	},
	disable: {
		backgroundColor: "gray",
		cursor: "no-drop",
		opacity: "0.8"
	}
});


class Free extends React.Component {
	static propTypes = {
		classes: object,
		googleVideoErrorStatus: bool,
		offers: array,
		onVideoPlay: func
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
		const { classes, offers, googleVideoErrorStatus } = this.props;

		return (
			<div className={classes.mainWrapperContent}>
				<Grid
					className={classes.mainContent}
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
									<Paper
										onClick={this.onPolifishBtnClick(name)}
										className={(name === "Video" && googleVideoErrorStatus) ? classNames(classes.root, classes.disable) : classes.root}
										elevation={1}
									>
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

