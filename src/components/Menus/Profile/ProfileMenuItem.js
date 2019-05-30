import React, { Component } from 'react';

import {  object } from "prop-types";

import classnames from "classnames";

import classes from "./ProfileMenuItem.less";

class ProfileMenuItem extends Component {
	static propTypes = {
		menuItem: object
	}

	render() {
		const { menuItem } = this.props;


		return (
			<div className={classes.profileMenuItemContent} >
				<img src={menuItem.icon} className={classes.profileMenuItemContentIcon} alt="" />
				<p className={classes.profileMenuItemContentText}> {menuItem.label} </p>
				{ menuItem.isNew &&
					<div className={classes.profileMenuItemContentNewWrapper}>
						<p className={classes.profileMenuItemContentNewText}>new</p>
					</div>
				}

				{
					menuItem.isCheckbox &&
					<label className={classes.profileMenuItemContentSwitch}>
						<input type="checkbox" />
						<span className={`${classes.profileMenuItemContentSlider} ${classes.profileMenuItemContentRound}`} >
							<p>on</p>
							<p>off</p>
						</span>
					</label>
				}
			</div>
		);
	}
}

export default ProfileMenuItem;

