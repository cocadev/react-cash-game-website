import React, { Fragment } from 'react';
import { bool, func } from "prop-types";

import "./VideoSDK.css";


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
