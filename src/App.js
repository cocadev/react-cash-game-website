import React, { Component } from 'react';

import { connect } from "react-redux";
import { Switch, withRouter } from "react-router-dom";
import { any, func, object } from "prop-types";

import HomePage from "./containers/HomePage/HomePage";
import LoginPage from "./containers/LoginPage/LoginPage";

import PrivateRoute from "./components/PrivateRouter/PrivateRouter";

import routes from "./constans/routes";

import * as authActions from "./modules/auth/auth.actions";

import "./App.less";


class App extends Component {
	static propTypes = {
		getUserDataSaga: func,
		setUserSessionId: func,
		user: any,
		userData: object,
	}

	componentDidMount() {
		const { user, userData, getUserDataSaga } = this.props;

		if (user && Object.keys(userData).length === 0) {
			getUserDataSaga();
		}
	}

	componentDidUpdate(prewProps) {
		if (this.props.location) {
			if (this.props.location.hash === "" && prewProps.location.hash.substring(0, 3) === "#s=") {
				this.props.setUserSessionId(prewProps.location.hash.slice(3));
			}
		}
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
		user: auth.user,
		userSessionId: auth.userSessionId,
		userData: auth.userData
	};
}

export default withRouter(connect(mapStateToProps, { ...authActions })(App));
