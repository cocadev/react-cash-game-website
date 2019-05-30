import React from 'react';
import { string, func, number, bool } from "prop-types";
import classnames from "classnames";
import BellIcon from "../../images/icons/bell.png";
import Ribbon from "../../images/ribbon.png";
import Odometer from "../../components/Odometer/Odometer";
import Euro from  "../../images/icons/euro.png";

import classes from "./UserWidget.less";


class UserWidget extends React.Component {
	static propTypes = {
		coins: number,
		imgSrc: string,
		lootBoxShow: func,
		name: string,
		onProfileShow: func,
		profilePage: bool
	}

	state = {
		startCoins: 0,
		endCoins: 0,
		onProgress: false
	}

	componentDidMount() {
		if (this.props.coins) {
			this.setState({
				endCoins: this.props.coins
			});
		}
	}

	componentDidUpdate() {
		if (this.props.coins && this.state.endCoins !== this.props.coins) {
			this.setState({
				endCoins: this.props.coins
			});
		}
	}

	onEndHandle = () => {
		this.setState({
			startCoins: this.state.endCoins,
			onProgress: false
		});
	}

	onStartHandle = () => {
		this.setState({
			onProgress: true
		});
	}

	onAvatarClick = () => {
		if (!this.props.profilePage) {
			this.props.onProfileShow();
		}
	}

	onLootBoxShowClick = () => {
		if (!this.props.profilePage) {
			this.props.lootBoxShow();
		}
	}

	render() {
		const { imgSrc, coins, profilePage } = this.props;

		const userWidgetClasses = classnames({
			[classes.userWidget]: true,
			[classes.userWidgetProfilePage]: profilePage
		});


		return (
			<div className={userWidgetClasses}>
				<div className={classes.userWidgetContent}>
					<div className={classes.userWidgetAvatarAndNotificationWrapper}>

						<div className={classes.userWidgetNotification}>
							<img src={BellIcon} alt="bell" />
							<div className={classes.userWidgetNotificationCounter}>
								<p>4</p>
							</div>
						</div>
						<div onClick={this.onAvatarClick} className={classes.userWidgetImageWrapper}>
							<img className={classes.userWidgetImage} src={imgSrc} alt="" />
						</div>
					</div>
				</div>
				<div className={classes.userWidgetRibbonWrapper }>
					<img className={classes.userWidgetRibbonImage} src={Ribbon} alt="Ribbon"/>
					<div className={classes.userWidgetEuroWrapper}>
						<img src={Euro} alt="euro"/>
						<Odometer
							value={coins}
							format="(,ddd)"
							classes={classes.userWidgetOdometerStyle}
						/>
					</div>

					<p>consec tetura</p>
				</div>
			</div>
		);
	}
}

export default UserWidget;
