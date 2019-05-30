import React, { Component } from 'react';

import { connect } from "react-redux";
import { Switch, withRouter } from "react-router-dom";
import { any } from "prop-types";

import PrivateRoute from "./components/PrivateRouter/PrivateRouter";

import HomePage from "./containers/HomePage/HomePage";
import LoginPage from "./containers/LoginPage/LoginPage";

import routes from "./constans/routes";


class App extends Component {
	static propTypes = {
		user: any,
	}

	render() {
		return (
			<Switch>
				<PrivateRoute
					exact
					path={routes.homePage}
					state={this.props.user}
					to={routes.login}
					component={HomePage}
				/>

				<PrivateRoute
					exact
					path={routes.login}
					state={!this.props.user}
					to={routes.homePage}
					component={LoginPage}
				/>
			</Switch>
		);
	}
}

function mapStateToProps({ auth }) {
	return {
		user: auth.user
	};
}

export default withRouter(connect(mapStateToProps, { })(App));
