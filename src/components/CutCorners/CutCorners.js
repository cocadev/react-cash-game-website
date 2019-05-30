import React from 'react';
import { object } from "prop-types";

import classes from "./CutCorners.less";


class CutCorners extends React.Component {
	static propTypes = {
		children: object,
		clipStyle: object
	}

	render() {
		const { clipStyle, children } = this.props;

		return (
			<div className={classes.cutCorners}>
				{ children }

				<div className={classes.cutCornersShadow} style={clipStyle} />
			</div>
		);
	}
}

export default CutCorners;
