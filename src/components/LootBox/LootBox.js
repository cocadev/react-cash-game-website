import React from 'react';
import { object, func, bool } from "prop-types";

import { withStyles } from '@material-ui/core/styles';

import customTween from "../../helpers/customTween";

const styles = () => ({
	root: {
		position: "absolute",
		margin: "65px 0 0 0",
		width: "100%",
		minHeight: "calc(100vh - 112px)",
		animation: "unset",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
		zIndex: "999"
	},
	imageWrapper: {
		width: "80%",
		height: "40%",
		textAlign: "center"
	},
	image: {
		width: "50%"
	}
});


class LootBox extends React.Component {
	static propTypes = {
		classes: object,
		lootBoxVisibility: bool,
		onHideAnimation: func,
	}

	constructor(props) {
		super(props);
		this.onLoadAnimation = React.createRef();
	}

	componentDidMount() {
		const dots = [
			{ y: 100, width: 0, x: 0, element: this.onLoadAnimation.current },
			{ y: 100, width: 0, x: 0, element: this.onLoadAnimation.current }];

		const time = 600;

		const update = ({ y, width, x, element }) => {
			element.style.transform = `translateY(${y}%) translateX(${x}%)`;
			element.style.width = `${width}%`;
		};

		customTween(dots, time, update, this.onLoadAnimation.current);
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.lootBoxVisibility  && this.props.lootBoxVisibility) {
			const dots = [
				{ y: 100, width: 10, x: 0, element: this.onLoadAnimation.current },
				{ y: 80, width: 100, x: 0, element: this.onLoadAnimation.current },
				{ y: 0, width: 100, x: 0, element: this.onLoadAnimation.current }
			];

			const time = 600;

			const update = ({ y, width, x, element }) => {
				element.style.transform = `translateY(${y}%) translateX(${x}%)`;
				element.style.width = `${width}%`;
			};

			customTween(dots, time, update, this.onLoadAnimation.current);
		} else if (prevProps.lootBoxVisibility  && !this.props.lootBoxVisibility) {
			const dots = [
				{ y: 0, width: 100, x: 0, element: this.onLoadAnimation.current },
				{ y: 80, width: 100, x: 0, element: this.onLoadAnimation.current },
				{ y: 100, width: 0, x: 0, element: this.onLoadAnimation.current },
			];

			const time = 600;

			const update = ({ y, width, x, element }) => {
				element.style.transform = `translateY(${y}%) translateX(${x}%)`;
				element.style.width = `${width}%`;
			};

			customTween(dots, time, update, this.onLoadAnimation.current);
		}
	}

	render() {
		const { classes } = this.props;
		return (
			<div ref={this.onLoadAnimation} className={classes.root}>
				<div className={classes.imageWrapper}>
					<img
						className={classes.image}
						src="https://playlivenation.com/wp-content/uploads/2017/11/7e27c6e71a02f14e2207578c53f1ca35-ow-lootbox-winter-mobile.jpg"
						alt="lootBox"
					/>
				</div>
			</div>
		);
	}
}

export default withStyles(styles,  { withTheme: true })(LootBox);
