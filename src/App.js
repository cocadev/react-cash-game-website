import React, { Component } from 'react';

import { connect } from "react-redux";
import { Switch, withRouter, Route, Redirect } from "react-router-dom";
import { any, func, object } from "prop-types";

import * as Sentry from '@sentry/browser';

import { ToastContainer } from 'react-toastify';

import ReactGA from 'react-ga';

import { LoaderContainer } from "./components/Loader/Loader";

import HomePage from "./containers/HomePage/HomePage";
import LoginPage from "./containers/LoginPage/LoginPage";
import PrivacyPolicyPage from "./containers/PrivacyPolicyPage/PrivacyPolicyPage";

import PrivateRoute from "./components/PrivateRouter/PrivateRouter";

import routes from "./constants/routes";
import parserRedirect from "./helpers/parcerRedirect";

import * as authActions from "./modules/auth/auth.actions";
import * as friendActions from "./modules/friend/friend.actions";

import "react-toastify/dist/ReactToastify.css";
import "./App.less";
import customToastify from "./helpers/customToastify";

Sentry.init({ dsn: 'https://87ee4c9092a1425c990ad3cd9d5fb349@sentry.io/1314519' });
//googleAnalytics
ReactGA.initialize("UA-125939911-1");

class App extends Component {
	static propTypes = {
		getUserDataSaga: func,
		location: any,
		user: any,
		userData: object
	}

	componentDidMount() {
		const { user, userData, getUserDataSaga } = this.props;

		if (user && Object.keys(userData).length === 0) {
			getUserDataSaga();
		}

		if (this.props.location) {
			parserRedirect(this.props);
		}

		this.fetchCurrentPage();
	}

	componentDidUpdate() {
		this.fetchCurrentPage();
	}

	componentDidCatch(error, errorInfo) {
		Sentry.withScope((scope) => {
			Object.keys(errorInfo).forEach((key) => {
				scope.setExtra(key, errorInfo[key]);
			});
			Sentry.captureException(error);
		});
	}

	notFoundRedirect = () => {
		customToastify("Oops not found", "error");

		console.log("not Found Page props", this.props);
		console.log("not Found Page window.location", window.location);

		if (this.props.user) {
			return <Redirect to={routes.homePage} />;
		}
		return  <Redirect to={routes.login} />;
	}

	fetchCurrentPage = () => {
		const { pathname, hash } = this.props.history.location;
		ReactGA.pageview(`${pathname}${hash}`);
	}

	render() {
		return (
			<div>
				<ToastContainer />
				<LoaderContainer />
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

					<Route
						exact
						path={routes.privacyPage}
						component={PrivacyPolicyPage}
					/>

					<Route
						component={this.notFoundRedirect}
					/>
				</Switch>
			</div>
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
