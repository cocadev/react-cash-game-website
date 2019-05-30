/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';

import logo from "../../images/logo.png";

import componentClasses from "./Loader.less";


class LoaderShowAllTime extends Component {
	render() {
		return (
			<div className={componentClasses.loaderWrapper}>
				<img src={logo} />
			</div>
		);
	}
}
;
export default  LoaderShowAllTime;
