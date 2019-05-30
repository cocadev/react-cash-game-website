import React from 'react';
import { string, func, object, number } from "prop-types";

import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
	root: {
		display: "flex",
		position: "fixed",
		alignItems: "center",
		left: "16px",
		cursor: "pointer",
		zIndex: "999"
	},
	imageWrapper: {
		backgroundColor: "#341E05",
		width: "60px",
		height: "60px",
		borderRadius: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		zIndex: "9999"
	},
	imageContainer: {
		backgroundColor: "#E6B263",
		width: "55px",
		height: "55px",
		borderRadius: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	image: {
		width: "45px",
		height: "45px",
		borderRadius: "100%",
		border: "1px solid #504F48"
	},
	coinWrapper: {
		backgroundColor: "#E6B263",
		width: "151px",
		height: "25px",
		borderRadius: "35%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginLeft: "-25px"
	},
	coinContainer: {
		backgroundColor: "#341E05",
		width: "145px",
		height: "21px",
		borderRadius: "35%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	coin: {
		width: "140px",
		height: "19px",
		color: "#E6B263",
		borderRadius: "35%",
		marginLeft: "36px",
	},
	nameWrapper: {
		backgroundColor: "#E6B263",
		width: "120px",
		height: "25px",
		borderRadius: "35%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginLeft: "-25px"
	},
	nameContainer: {
		backgroundColor: "#341E05",
		width: "115px",
		height: "21px",
		borderRadius: "35%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	name: {
		width: "110x",
		height: "19px",
		color: "#E6B263",
		borderRadius: "35%",
		marginLeft: "20px",
	}
});


class UserWidget extends React.Component {
	static propTypes = {
		classes: object,
		coins: number,
		imgSrc: string,
		lootBoxShow: func,
		name: string
	}

	render() {
		const { classes, imgSrc, coins, name, lootBoxShow } = this.props;

		return (
			<div onClick={lootBoxShow} className={classes.root}>
				<div className={classes.imageWrapper}>
					<div className={classes.imageContainer}>
						<img className={classes.image} src={imgSrc} alt="" />
					</div>
				</div>
				<div>
					<div className={classes.coinWrapper}>
						<div className={classes.coinContainer}>
							<p className={classes.coin}>coins: { coins }</p>
						</div>
					</div>
					<div className={classes.nameWrapper}>
						<div className={classes.nameContainer}>
							<p className={classes.name}>{ name }</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(styles,  { withTheme: true })(UserWidget);
