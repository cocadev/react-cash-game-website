import React, { Component } from 'react';

import BoxIcon1 from "../../../../images/boxes/box.png";
import BoxIcon2 from "../../../../images/boxes/box2.png";
import BoxIcon3 from "../../../../images/boxes/box3.png";
import BoxIcon4 from "../../../../images/boxes/box4.png";

import classes from "./Notification.less";

class Notification extends Component {
	state = {
		boxes: [
			{ id: 1, img: BoxIcon1, text: "Lorem ipsum dolor sit consect etur adipiscing elit. Vivamus." },
			{ id: 2, img: BoxIcon2, text: "Lorem ipsum dolor sit consect etur adipiscing elit. Vivamus."  },
			{ id: 3, img: BoxIcon3, text: "Lorem ipsum dolor sit consect etur adipiscing elit. Vivamus."  },
			{ id: 4, img: BoxIcon4, text: "Lorem ipsum dolor sit consect etur adipiscing elit. Vivamus." }
		]
	}

	renderBox = (box) => {
		return (
			<div key={box.id} className={classes.notificationSingleBox}>
				<div className={classes.notificationSingleBoxImageWrapper}>
					<img src={box.img} alt="" />
				</div>
				<div className={classes.notificationSingleBoxContent}>
					<h4 className={classes.notificationSingleBoxLabel}>Loot Box {box.id}</h4>
					<p className={classes.notificationSingleBoxText}>
						{box.text}

					</p>
					<a className={classes.notificationSingleBoxButton}> Open Loot box</a>
				</div>
			</div>
		);
	}

	render() {
		return (
			<div className={classes.notification}>
				<p className={classes.notificationLabel}>
					Notification
				</p>
				{
					this.state.boxes.map((box) => {
						return this.renderBox(box);
					})
				}

				<a className={classes.notificationButton}>view all notification</a>


			</div>

		);
	}
}

export default Notification;

