import React from 'react';
import { connect } from "react-redux";
import { object, bool, func } from "prop-types";

import { withStyles } from '@material-ui/core/styles';

import VideoSDK from "../VideoSDK/VideoSDK";
import * as saleActions from "../../modules/sale/sale.actions";
import { GoogleSDK } from "../../helpers/googleSDK";
import customToastify from "../../helpers/customToastify";

function onMouseWheel(e){ e.preventDefault(); }

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
	},
	hide: {
		display: "none"
	}
});


class VideSDKWrapper extends React.Component {
	static propTypes = {
		classes: object,
		googleVideoErrorStatus: bool,
		googleVideoErrorStatusChange: func,
		onVideoFinish: func,
		showAddBlockNotification: bool,
		videoPlayStatus: bool
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

	componentDidUpdate(prevProps) {
		if (this.props.videoPlayStatus && !prevProps.videoPlayStatus) {
			this.onBtnPlay();
		}
	}

	closeFullscreen = () =>  {
		document.body.classList.remove("bodyFullScreen");

		document.body.removeEventListener("mousewheel", onMouseWheel);
		this.setState({
			videoAddStatus: "end"
		});

		customToastify("Please close AdBlock or uBlock for reward", "error", "TOP_CENTER");

		this.props.onVideoFinish();

		this.props.googleVideoErrorStatusChange(true);
	}


	onAddLoaded = (contentElement, adContainer) => {
		this.setState({
			googleSDKObj: new GoogleSDK(this.onVideoEnd, this.onVideoStart, contentElement.current, adContainer.current, this.closeFullscreen),
			contentElement,
			adContainer
		}, () => {
			try {
				this.state.googleSDKObj.init();
				this.props.googleVideoErrorStatusChange(false);
			} catch (e) {
				this.setState({
					googleError: true
				});
				this.props.googleVideoErrorStatusChange(true);
			}
		});
	}

	onBtnPlay = () => {
		if (!this.state.googleError && !this.props.googleVideoErrorStatus) {
			this.state.googleSDKObj.playAds();
		} else {
			customToastify("Please close AdBlock or uBlock for reward", "error", "TOP_CENTER");
			this.props.onVideoFinish();
		}
	}

	onBtnPause = () => {
		if (!this.state.googleError) {
			this.state.googleSDKObj.onContentPauseRequested();
		}
	}

	onPolifishBtnClick = (name) => () => {
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

		this.props.onVideoFinish();

		this.state.googleSDKObj.init();
	}

	render() {
		const { classes } = this.props;

		const showVideoSDKClass = this.state.videoAddStatus === "play" ? classes.mainWrapperContent : classes.hide;

		return (
			<div className={showVideoSDKClass}>
				<VideoSDK onAddLoaded={this.onAddLoaded}fullScreen={this.state.videoAddStatus === "play"} />
			</div>
		);
	}
}

export default connect(null, { ...saleActions })((withStyles(styles,  { withTheme: true })(VideSDKWrapper)));

