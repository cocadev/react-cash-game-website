import React, { Fragment } from 'react';

import "./VideoSDK.css";


class VideoSDK extends React.Component {
	render() {
		return (
			<Fragment>
				<div id="mainContainer">
					<div id="content">
						<video id="contentElement">
							{/*<source src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" />*/}
						</video>
					</div>
					<div id="adContainer" className={this.props.fullScreen && "fullScreen"} />
				</div>
			</Fragment>
		);
	}
}

export default VideoSDK;
