/* eslint-disable react/prefer-stateless-function,react/jsx-no-bind,react/forbid-prop-types */
/* eslint-disable curly */
import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";

import { object, bool, string, any } from "prop-types";
//import classes from "./Check.less";

// попробуем смержить


class PrivateRouter extends Component {
	static propTypes = {
		component: any,
		state: bool,
		to: string,
		user: object,
	};

	render() {
		const { component, state, to, ...rest } = this.props;

		return (
			<div>
				<Route
					{...rest}
					render={(props) => {
						if (!state) return <Redirect to={to} />;

						return React.createElement(component, props);
					}}
				/>
			</div>
		);
	}
}


export default PrivateRouter;
