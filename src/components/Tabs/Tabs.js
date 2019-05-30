import React, { Fragment } from 'react';
import { func, object, array, bool, any } from "prop-types";

import TabsMaterial from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import classes from "./Tabs.less";


class Tabs extends React.Component {
	static propTypes = {
		customstyle: object,
		fullWidth: bool,
		labels: array,
		mainTabChange: func,
		value: any
	}

	static defaultProps = {
		fullWidth: false
	}
	render() {
		const { labels, fullWidth, customstyle } = this.props;

		return (
			<Fragment>
				<TabsMaterial
					classes={{ flexContainer: classes.tab }}
					style={customstyle}
					fullWidth={fullWidth}
					value={this.props.value}
					indicatorColor="primary"
					textColor="primary"
					{...this.props}
				>
					{
						labels.map((label) => {
							return (
								<Tab
									className={classes.tabSingleTab}
									key={label.name}
									label={
										<span
											style={
												label.iconStyle &&
												label.iconStyle
											}
										>{ label.name }</span>}
									icon={label.icon ? <img src={label.icon}  alt="" /> : false}
								/>
							);
						})
					}
				</TabsMaterial>
			</Fragment>
		);
	}
}

export default Tabs;
