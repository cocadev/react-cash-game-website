import React, { Component } from 'react';

import { connect } from "react-redux";
import { Switch, withRouter } from "react-router-dom";
import { any, func, object } from "prop-types";

import * as Sentry from '@sentry/browser';

import { ToastContainer } from 'react-toastify';

import { LoaderContainer, loader } from "./components/Loader/Loader";
import HomePage from "./containers/HomePage/HomePage";
import LoginPage from "./containers/LoginPage/LoginPage";

import PrivateRoute from "./components/PrivateRouter/PrivateRouter";

import routes from "./constants/routes";
import parserRedirect from "./helpers/parcerRedirect";

import * as authActions from "./modules/auth/auth.actions";
import * as friendActions from "./modules/friend/friend.actions";

import { pollfishConfig } from "./helpers/polifish";

import "react-toastify/dist/ReactToastify.css";
import "./App.less";

Sentry.init({ dsn: 'https://87ee4c9092a1425c990ad3cd9d5fb349@sentry.io/1314519' });


class App extends Component {
	static propTypes = {
		getUserDataSaga: func,
		location: any,
		user: any,
		userData: object
	}

	componentWillMount() {
		Pollfish.start(pollfishConfig);
	}

	componentDidMount() {
		const { user, userData, getUserDataSaga } = this.props;

		if (user && Object.keys(userData).length === 0) {
			getUserDataSaga();
		}
		console.log(this.props.location);
		if (this.props.location) {
			parserRedirect(this.props);
		}
	}

	componentDidCatch(error, errorInfo) {
		Sentry.withScope((scope) => {
			Object.keys(errorInfo).forEach((key) => {
				scope.setExtra(key, errorInfo[key]);
			});
			Sentry.captureException(error);
		});
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
