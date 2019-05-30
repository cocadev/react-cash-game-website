import React, { Component } from 'react';
import { func, string, object, bool } from "prop-types";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import ScrollDialog from "../../components/ScrollDialog/ScrollDialog";

import { api } from "../../config";
import * as authAction from "../../modules/auth/auth.actions";

import classes from "./LoginPage.less";


class LoginPage extends Component {
	static propTypes = {
		confirmAgeSaga: func,
		googleLoginUserSaga: func,
		userData: object,
		userLoaded: bool,
		userLoginStatus: string,
		userSessionId: string
	}

	state = {
		termsOfService: "",
		modalVisibility: false,
	}

	componentDidUpdate(prevProps) {
		const { userSessionId, googleLoginUserSaga } = this.props;

		if (userSessionId !== "" && prevProps.userSessionId === "") {
			googleLoginUserSaga(userSessionId);
		}

		if (this.props.userLoaded && !prevProps.userLoaded) {
			this.setState({ modalVisibility: true });
		}
	}

	handleModalClose = () => {
		this.setState({ modalVisibility: false });
	};

	handleConfirmAge = (data) => {
		this.props.confirmAgeSaga(data);
	}


	render() {
		const { modalVisibility } = this.state;

		return (
			<div className={classes.loginPage}>
				<a
					name="google"
					className={classes.loginPageGoogleLoginBtn}
					href={api.urls.auth.googleLogin}
				>
					Google Login
				</a>

				<a
					name="facebook"
					className={classes.loginPageGoogleLoginBtn}
					href="#"
				>
					FaceBook Login (not work yet)
				</a>

				<ScrollDialog
					handleConfirmAge={this.handleConfirmAge}
					open={modalVisibility}
					handleClose={this.handleModalClose}
				/>
			</div>
		);
	}
}

function mapStateToProps({ auth }) {
	return {
		userLoaded: auth.userLoaded,
		userLoginStatus: auth.userLoginStatus,
		userData: auth.userData,
		userSessionId: auth.userSessionId
	};
}

export default withRouter(connect(mapStateToProps, { ...authAction })(LoginPage));
