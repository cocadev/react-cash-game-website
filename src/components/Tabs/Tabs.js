import React, { Fragment } from 'react';
import { func, object, array, bool } from "prop-types";

import Paper from '@material-ui/core/Paper';
import TabsMaterial from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


class Tabs extends React.Component {
	static propTypes = {
		customStyle: object,
		fullWidth: bool,
		labels: array,
		mainTabChange: func,
		value: object
	}

	static defaultProps = {
		fullWidth: false
	}

	handleChange = (event, value) => {
		const index = { value };

		this.props.mainTabChange({
			index: index.value,
			name: event.target.textContent
		});
	};

	render() {
		const { labels, fullWidth, customStyle } = this.props;
		return (
			<Fragment>
				<TabsMaterial
					className={"mainColor"}
					style={customStyle}
					fullWidth={fullWidth}
					value={this.props.value.index}
					indicatorColor="primary"
					textColor="primary"
					onChange={this.handleChange}
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
