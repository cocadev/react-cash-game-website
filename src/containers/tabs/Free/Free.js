import React from 'react';
import { connect } from "react-redux";
import { object, array } from "prop-types";

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import VideoSDK from "../../../components/VideoSDK/VideoSDK";
import * as saleActions from "../../../modules/sale/sale.actions";
import { GoogleSDK } from "../../../helpers/googleSDK";

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
	}
});

class Free extends React.Component {
	static propTypes = {
		classes: object,
		offers: array
	}

	state = {
		googleSDKObj: null,
		fullScreen: false
	}

	componentDidMount() {
		this.setState({
			googleSDKObj: new GoogleSDK()
		}, () => {
			this.state.googleSDKObj.init();
		});
		// Wire UI element references and UI event listeners.
	}

	onBtnPlay = () => {
		this.setState({
			fullScreen: true
		}),
		this.state.googleSDKObj.playAds();
	}
	onBtnPause = () => {
		this.state.googleSDKObj.onContentPauseRequested();
	}

	onPolifishBtnClick = (name) => () => {
		if (name  === "Survey") {
			Pollfish.showFullSurvey();
		}
		if (name === "Video") {
			this.onBtnPlay();
		}
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
							const { name, description } = offer;

							return (
								<Grid key={index} lg={2} item xs={12}>
									<Paper id={name === "Video" && "playButton"} onClick={this.onPolifishBtnClick(name)} className={classes.root} elevation={1}>
										<h3>{ name }</h3>
										<p>{ description }</p>
									</Paper>
								</Grid>
							);
						})
					}
				</Grid>

				<VideoSDK fullScreen={this.state.fullScreen} />
			</div>
		);
	}
}

export default connect(null, { ...saleActions })((withStyles(styles,  { withTheme: true })(Free)));

