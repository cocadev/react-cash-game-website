import React from 'react';
import { connect } from "react-redux";
import { object, array, bool } from "prop-types";

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import VideoSDK from "../../../components/VideoSDK/VideoSDK";
import * as saleActions from "../../../modules/sale/sale.actions";
import { GoogleSDK } from "../../../helpers/googleSDK";
import customToastify from "../../../helpers/customToastify";
import customTween from "../../../helpers/cutstomTween";

import withAnimation from "../../../hoc/animation";

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
		margin: "20px 0 0 0",
		width: "100%",
		minHeight: "calc(100vh - 112px)",
		animation: "unset"
	}
});

class Free extends React.Component {
	static propTypes = {
		classes: object,
		offers: array,
		showAddBlockNotification: bool
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

	componentDidMount(){
		// const dots = [
		// 	{ y: 100, width: 10, x: 0, element: this.onLoadAnimation.current },
		// 	{ y: 80, width: 100, x: 0, element: this.onLoadAnimation.current },
		// 	{ y: 0, width: 100, x: 0, element: this.onLoadAnimation.current }
		// ];
		//
		// const time = 600;
		//
		// const update = ({ y, width, x, element }) => {
		// 	element.style.transform = `translateY(${y}%) translateX(${x}%)`;
		// 	element.style.width = `${width}%`;
		// };
		//
		// customTween(dots, time, update, this.onLoadAnimation.current);
	}

	componentDidUpdate(prevProps){
		if (this.props.showAddBlockNotification && !prevProps.showAddBlockNotification) {
			if (this.state.googleError) {
				customToastify("Please close AdBlock or uBlock for reward", "error", "TOP_CENTER");
			}
		}
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
				if (this.props.showAddBlockNotification) {
					customToastify("Please close AdBlock or uBlock for reward", "error", "TOP_CENTER");
				}
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

				<VideoSDK onAddLoaded={this.onAddLoaded} fullScreen={this.state.videoAddStatus === "play"} />
			</div>
		);
	}
}

export default connect(null, { ...saleActions })((withStyles(styles,  { withTheme: true })(Free)));

