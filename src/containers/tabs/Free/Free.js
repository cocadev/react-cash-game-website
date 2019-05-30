import React from 'react';
import { connect } from "react-redux";
import { object, array } from "prop-types";

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import VideoSDK from "../../../components/VideoSDK/VideoSDK";
import * as saleActions from "../../../modules/sale/sale.actions";
import { GoogleSDK } from "../../../helpers/googleSDK";
import customToastify from "../../../helpers/customToastify";

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
		videoAddStatus: "",
		contentElement: null,
		adContainer: null,
		googleError: false,
	}

	onAddLoaded = (contentElement, adContainer) => {
		this.setState({
			googleSDKObj: new GoogleSDK(this.onVideoEnd, this.onVideoStart, contentElement.current, adContainer.current),
			contentElement,
			adContainer
		}, () => {
			try {
				this.state.googleSDKObj.init();
			} catch (e) {
				this.setState({
					googleError: true
				});
				customToastify("Please close AdBlock or uBlock for reward", "error", "TOP_CENTER");
			}
		});
	}

	onBtnPlay = () => {
		if (!this.state.googleError) {
			this.state.googleSDKObj.playAds();
		} else {
			customToastify("Please close AdBlock or uBlock for reward", "error", "TOP_CENTER");
		}
	}

	onBtnPause = () => {
		if (!this.state.googleError) {
			this.state.googleSDKObj.onContentPauseRequested();
		}
	}

	onPolifishBtnClick = (name) => () => {
		if (name  === "Survey") {
			Pollfish.showFullSurvey();
		}
		if (name === "Video") {
			this.onBtnPlay();
		}
	}

	onVideoStart = () => {
		this.setState({
			videoAddStatus: "play",
		});
	}

	onVideoEnd = () => {
		this.setState({
			videoAddStatus: "end"
		});

		this.state.googleSDKObj.init();
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
									<Paper onClick={this.onPolifishBtnClick(name)} className={classes.root} elevation={1}>
										<h3>{ name }</h3>
										<p>{ description }</p>
									</Paper>
								</Grid>
							);
						})
					}
				</Grid>

				<VideoSDK onAddLoaded={this.onAddLoaded} fullScreen={this.state.videoAddStatus === "play"} />
			</div>
		);
	}
}

export default connect(null, { ...saleActions })((withStyles(styles,  { withTheme: true })(Free)));

