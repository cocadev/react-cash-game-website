import React from 'react';
import { bool, func } from "prop-types";

import "./VideoSDK.css";

function onMouseWheel(e){ e.preventDefault(); }

function openFullscreen(elem) {
	document.body.classList.add("bodyFullScreen");
	document.body.addEventListener("mousewheel", onMouseWheel);
	document.body.addEventListener("touchmove", onMouseWheel);
	document.body.removeEventListener("touchstart", onMouseWheel);

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
	document.body.classList.remove("bodyFullScreen");
	document.body.removeEventListener("mousewheel", onMouseWheel);
	document.body.removeEventListener("touchstart", onMouseWheel);
	document.body.removeEventListener("touchmove", onMouseWheel);

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
		googleVideoErrorStatus: bool,
		onAddBlockOff: func,
		onAddLoaded: func
	}

	constructor(props) {
		super(props);
		this.contentElement = React.createRef();
		this.adContainer = React.createRef();
	}

	componentDidMount() {
		this.props.onAddLoaded(this.contentElement, this.adContainer);
		setInterval(() => {
			if (this.props.googleVideoErrorStatus) {
				this.props.onAddLoaded(this.contentElement, this.adContainer, true);
			}
		}, 5000);
	}

	componentDidUpdate(prevProps){
		if (this.props.fullScreen && !prevProps.fullScreen) {
			openFullscreen(this.adContainer.current);
		} else {
			closeFullscreen(this.adContainer.current);
		}
	}

	render() {
		return (
			<>
				<div className="mainContainer">
					<div className="content">
						<video ref={this.contentElement} className="contentElement">
							{/*<source src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" />*/}
						</video>
					</div>
					<div ref={this.adContainer} className="adContainer" className={this.props.fullScreen ? "fullScreen" : "false"} />
				</div>
			</>
		);
	}
}

export default VideoSDK;
