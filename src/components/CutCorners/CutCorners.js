import React from 'react';
import { object } from "prop-types";

import { withStyles } from '@material-ui/core/styles';


const styles = () => ({
	wrapper: {
		position: "relative",
	},
	cutCornerShadow: {
		position: "absolute",
		zIndex: "-1",
		content: "",
		background: "rgba(0, 0, 0, .2)",
		width: "100%",
		height: "100%",
		top: "3px",
		webkitFilter: "blur(5px)",
		mozFilter: "blur(5px)",
		filter: "blur(5px)"
	}
});


class CutCorners extends React.Component {
	static propTypes = {
		classes: object,
		clipStyle: object
	}

	render() {
		const { classes, clipStyle } = this.props;

		return (
			<div className={classes.wrapper}>
				{this.props.children}

				<div className={classes.cutCornerShadow} style={clipStyle}></div>
			</div>
		);
	}
}

export default withStyles(styles)(CutCorners);
