import React from 'react';
import { connect } from "react-redux";
import { array, bool, func } from "prop-types";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import classNames from "classnames";

import * as saleActions from "../../../modules/sale/sale.actions";

import classes from "./Free.less";


class Free extends React.Component {
	static propTypes = {
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

	componentDidMount() {
		this.props.changeScrollTabHeight();
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
		const { offers, googleVideoErrorStatus } = this.props;

		return (
			<div className={classes.free}>
				<Grid
					className={classes.freeMainContent}
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
										className={(name === "Video" && googleVideoErrorStatus) ?
											classNames(classes.freeRoot, classes.freeDisable)
											:
											classes.freeRoot}
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

export default connect(null, { ...saleActions })((Free));

