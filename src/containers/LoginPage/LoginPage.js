import React, { Component } from 'react';
import { func, string, object, bool } from "prop-types";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import ScrollDialog from "../../components/ScrollDialog/ScrollDialog";
import ConfirmName from "../../components/ConfirmName/ConfirmName";

import { api } from "../../config";
import * as authAction from "../../modules/auth/auth.actions";

import classes from "./LoginPage.less";


class LoginPage extends Component {
	static propTypes = {
		confirmAge: string,
		confirmAgeSaga: func,
		googleLoginUserSaga: func,
		userData: object,
		userLoaded: bool,
		userLoginStatus: string,
		setLoginNameSaga: func,
		userSessionId: string
	}

	state = {
		termsOfService: "",
		modalVisibility: false,
	}

	componentDidMount() {
		const { userSessionId, googleLoginUserSaga } = this.props;

		if (userSessionId !== "") {
			googleLoginUserSaga(userSessionId);
		}
	}

	componentDidUpdate(prevProps) {
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
		const { confirmAge } = this.props;

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
					open={modalVisibility && confirmAge !== "success"}
					handleClose={this.handleModalClose}
				/>

				<ConfirmName open={confirmAge === "success"} setLoginName={this.props.setLoginNameSaga} />
			</div>
		);
	}
}

function mapStateToProps({ auth }) {
	return {
		userLoaded: auth.userLoaded,
		userLoginStatus: auth.userLoginStatus,
		userData: auth.userData,
		userSessionId: auth.userSessionId,
		confirmAge: auth.confirmAge
	};
}

export default withRouter(connect(mapStateToProps, { ...authAction })(LoginPage));
