import React from 'react';
import { bool, number } from "prop-types";

import customTween from "../../helpers/customTween";

import GiftBoxImg from "../../images/giftBox.png";

import Odometer from "../../components/Odometer/Odometer";

import classes from "./LootBox.less";


class LootBox extends React.Component {
	static propTypes = {
		funBalance: number,
		lootBoxVisibility: bool
	}

	state = {
		odometerValue: 0,
	}

	constructor(props) {
		super(props);
		this.onLoadAnimation = React.createRef();
	}

	componentDidMount() {
		const dots = [
			{ y: 100, width: 100, x: 0, element: this.onLoadAnimation.current },
			{ y: 0, width: 100, x: 0, element: this.onLoadAnimation.current }
		];

		const time = 400;

		const update = ({ y, width, x, element }) => {
			element.style.display = "flex";
			element.style.transform = `translateY(${y}%) translateX(${x}%)`;
			element.style.width = `${width}%`;
		};

		this.setState({
			odometerValue: this.props.funBalance ? this.props.funBalance : 0
		});

		customTween(dots, time, update, this.onLoadAnimation.current);
	}

	componentDidUpdate(prevProps) {
		//Up
		if (!prevProps.lootBoxVisibility  && this.props.lootBoxVisibility) {
			const dots = [
				{ y: 100, width: 100, x: 0, element: this.onLoadAnimation.current },
				{ y: 0, width: 100, x: 0, element: this.onLoadAnimation.current }
			];

			const time = 400;

			const update = ({ y, width, x, element }) => {
				element.style.display = "flex";
				element.style.transform = `translateY(${y}%) translateX(${x}%)`;
				element.style.width = `${width}%`;
			};
			this.setState({
				odometerValue: this.props.funBalance ? this.props.funBalance : 0
			});

			customTween(dots, time, update, this.onLoadAnimation.current);
		} else if (prevProps.lootBoxVisibility  && !this.props.lootBoxVisibility) {
			//down
			const dots = [
				{ y: 0, width: 100, x: 0, display: 0, element: this.onLoadAnimation.current },
				{ y: 100, width: 100, x: 0, display: 100, element: this.onLoadAnimation.current },
			];

			const time = 600;

			const update = ({ y, width, x, display, element }) => {
				element.style.transform = `translateY(${y}%) translateX(${x}%)`;
				element.style.width = `${width}%`;

				if (display === 100) {
					element.style.display = `none`;
				}
			};
			this.setState({
				odometerValue: 0
			});

			customTween(dots, time, update, this.onLoadAnimation.current);
		}
		/**
		 * starts on first render when lootbox is open
		 */
		else if (prevProps.lootBoxVisibility  && this.props.lootBoxVisibility && this.props.funBalance && this.state.odometerValue !== this.props.funBalance) {
			this.setState({
				odometerValue: this.props.funBalance
			});
		}
	}

	render() {
		const { odometerValue } = this.state;

		return (
			<div ref={this.onLoadAnimation} className={classes.lootBox}>
				<div className={classes.lootBoxContent}>
					<div className={classes.lootBoxImageWrapper}>
						<img
							className={classes.lootBoxImage}
							src={GiftBoxImg}
							alt="lootBox"
						/>
					</div>

					<div className={classes.lootBoxFooter}>
						<div className={classes.lootBoxOpenLootBox}>
							<p className={classes.lootBoxOpenLootBoxText}>1 Golden Lootbox</p>
							<a className={classes.lootBoxOpenLootBoxButton}>
								open Loot Box
							</a>
						</div>
						<div className={classes.lootBoxCounterWrapper}>
							<p>You Have </p>
							{/*<img src={CounterExample} className={classes.lootBoxCounterImage} alt=""/>*/}
							<Odometer
								value={odometerValue}
								format="(,ddd)"
								classes={classes.lootBoxOdometerStyle}
							/>
							<p> Loot Boxes </p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default LootBox;
