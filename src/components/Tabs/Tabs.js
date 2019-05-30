import React, { Fragment } from 'react';
import { func, object } from "prop-types";

import Paper from '@material-ui/core/Paper';
import TabsMaterial from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


class Tabs extends React.Component {
	static propTypes = {
		mainTabChange: func,
		value: object
	}

	handleChange = (event, value) => {
		const index = { value };

		this.props.mainTabChange({
			index: index.value,
			name: event.target.textContent
		});
	};

	render() {
		return (
			<Paper square>
				<TabsMaterial
					value={this.props.value.index}
					indicatorColor="primary"
					textColor="primary"
					onChange={this.handleChange}
				>
					<Tab label="Friends" />
					<Tab label="Sale" />
				</TabsMaterial>
			</Paper>
		);
	}
}

export default Tabs;
