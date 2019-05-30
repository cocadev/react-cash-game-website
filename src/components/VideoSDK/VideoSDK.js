import React, { Fragment } from 'react';
import { bool, func } from "prop-types";

import "./VideoSDK.css";

function openFullscreen(elem) {
	if (elem.requestFullscreen) {
		elem.requestFullscreen();
	} else if (elem.mozRequestFullScreen) { /* Firefox */
		elem.mozRequestFullScreen();
	} else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
		elem.webkitRequestFullscreen();
	} else if (elem.msRequestFullscreen) { /* IE/Edge */
		elem.msRequestFullscreen();
	}
}

function closeFullscreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.mozCancelFullScreen) { /* Firefox */
		document.mozCancelFullScreen();
	} else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
		document.webkitExitFullscreen();
	} else if (document.msExitFullscreen) { /* IE/Edge */
		document.msExitFullscreen();
	}
}


class VideoSDK extends React.Component {
	static propTypes = {
		fullScreen: bool,
		onAddLoaded: func
	}

	constructor(props) {
		super(props);
		this.contentElement = React.createRef();
		this.adContainer = React.createRef();
	}

	componentDidMount() {
		this.props.onAddLoaded(this.contentElement, this.adContainer);
	}

	componentDidUpdate(prevProps){
		if (this.props.fullScreen && !prevProps.function) {
			openFullscreen(this.adContainer.current);
		} else {
			closeFullscreen(this.adContainer.current);
		}
	}

	render() {
		return (
			<Fragment>
				<div className="mainContainer">
					<div className="content">
						<video ref={this.contentElement} className="contentElement">
							{/*<source src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" />*/}
						</video>
					</div>
					<div ref={this.adContainer} className="adContainer" className={this.props.fullScreen ? "fullScreen" : "false"} />
				</div>
			</Fragment>
		);
	}
}

export default VideoSDK;
