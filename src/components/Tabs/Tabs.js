import React, { Fragment } from 'react';
import { func, object, array, bool, any } from "prop-types";

import Paper from '@material-ui/core/Paper';
import TabsMaterial from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


class Tabs extends React.Component {
	static propTypes = {
		customStyle: object,
		fullWidth: bool,
		labels: array,
		mainTabChange: func,
		value: any
	}

	static defaultProps = {
		fullWidth: false
	}
	render() {
		const { labels, fullWidth, customStyle } = this.props;

		return (
			<Fragment>
				<TabsMaterial
					style={customStyle}
					fullWidth={fullWidth}
					value={this.props.value}
					indicatorColor="primary"
					textColor="primary"
					{...this.props}
				>
					{
						labels.map((label) => {
							return <Tab key={label.name} label={label.name} />;
						})
					}
				</TabsMaterial>
			</Fragment>
		);
	}
}

export default Tabs;
