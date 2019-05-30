import React, { Component } from 'react';
import { func, string, object, bool } from "prop-types";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as loginActions from "../../modules/login/login.actions";

import classes from "./LoginPage.less";

class LoginPage extends Component {
	state = {
		termsOfService: ""
	}

	static propTypes = {
		googleLoginUserSaga: func,
		userData: object,
		userLoaded: bool,
		userLoginStatus: string
	}

	async componentWillReceiveProps(nextProps) {
		if (!this.props.userLoaded && nextProps.userLoaded) {
		}
	}

	onGoogleLoginBtnClick = () => {
		this.props.googleLoginUserSaga();
	}

	render() {
		const { userData } = this.props;

		return (
			<div className={classes.loginPage}>
				<button onClick={this.onGoogleLoginBtnClick} className={classes.loginPageGoogleLoginBtn}>
					Google Login
				</button>

				{Object.keys(userData).length !== 0 &&
					this.state.termsOfService
				}
			</div>
		);
	}
}

function mapStateToProps({ login }) {
	return {
		userLoaded: login.userLoaded,
		userLoginStatus: login.userLoginStatus,
		userData: login.userData,
	};
}

export default withRouter(connect(mapStateToProps, { ...loginActions })(LoginPage));
