import React, { Component } from 'react';

import { connect } from "react-redux";
import { Switch, withRouter } from "react-router-dom";
import { any, func, object } from "prop-types";

import HomePage from "./containers/HomePage/HomePage";
import LoginPage from "./containers/LoginPage/LoginPage";

import PrivateRoute from "./components/PrivateRouter/PrivateRouter";

import routes from "./constants/routes";
import parserRedirect from "./helpers/parcerRedirect";

import * as authActions from "./modules/auth/auth.actions";
import * as friendActions from "./modules/friend/friend.actions";

import "./App.less";


class App extends Component {
	static propTypes = {
		getUserDataSaga: func,
		newFriendSaga: func,
		setUserSessionId: func,
		user: any,
		userData: object,
	}

	componentDidMount() {
		const { user, userData, getUserDataSaga } = this.props;

		if (user && Object.keys(userData).length === 0) {
			getUserDataSaga();
		}

		if (this.props.location) {
			parserRedirect(this.props);
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

export default withRouter(connect(mapStateToProps, { ...authActions, ...friendActions })(App));
