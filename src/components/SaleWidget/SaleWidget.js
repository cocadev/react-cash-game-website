import React, { Fragment } from 'react';
import { bool, func, object } from "prop-types";

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import PaypalExpressBtn from 'react-paypal-express-checkout';
import SwipeableViews from 'react-swipeable-views';

import CreditCard from "../../components/CreditCard/CreditCard";
import Tabs from "../../components/Tabs/Tabs";
import customToastify from "../../helpers/customToastify";


const styles = () => ({
	buttonWrapper: {
		display: 'flex',
		width: "100%",
		justifyContent: 'center'
	},
	content: {
		display: "flex",
		justifyContent: "center"
	},
	dialogMinSize: {
		minWidth: "40%",
		minHeight: "50%"
	},
	payPal: {
		display: "flex",
		justifyContent: "center",
		marginTop: "30px",
		"& .zoid-outlet": {
			width: "200px !important",
			height: "300px !important",
		}
	}
});


class SaleWidget extends React.Component {
	static propTypes = {
		classes: object,
		onClose: func,
		open: bool,
		theme: object
	}

	state = {
		value: 0,
		validData: false,
		errorShow: false
	};

	mainTabChange = (value) => {
		this.setState({
			tabsValue: value
		});
	};

	handleChange = (event, value) => {
		this.setState({ value });
	};

	handleChangeIndex = (index) => {
		this.setState({ value: index });
	};

	onBuyBtnClick = () => {
		const { validData } = this.state;

		if (validData) {
			this.props.onClose();
			customToastify("Your purchase is pending now", "success");
		} else {
			this.setState({ errorShow: true });
		}
	}

	onValueValid = (value) => {
		this.setState({
			validData: value
		});
	}

	render() {
		const { classes, theme } = this.props;

		const { value, errorShow } = this.state;

		const labels = [{ name: "Paypal" }, { name: "Credit Card" }, { name: "Gold Coins" }];

		const client = {
			sandbox: 'YOUR-SANDBOX-APP-ID',
			production: 'YOUR-PRODUCTION-APP-ID',
		};

		return (
			<>
				<Tabs
					value={value}
					fullWidth
					onChange={this.handleChange}
					labels={labels}
				/>
				<div className={classes.tabContentWrapper}>
					<SwipeableViews
						axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
						index={value}
						onChangeIndex={this.handleChangeIndex}
					>
						<div className={classes.payPal}><PaypalExpressBtn client={client} currency={'USD'} total={1.00} /></div>
						<Fragment>
							<DialogContent className={classes.content}>
								<CreditCard isAllValueValid={this.onValueValid} errorShow={errorShow}  />
							</DialogContent>
							<DialogActions >

								<div className={classes.buttonWrapper}>
									<Button onClick={this.props.onClose} color="primary">
												Cancel
									</Button>
									<Button onClick={this.onBuyBtnClick} color="primary">
												Buy
									</Button>
								</div>
							</DialogActions>
						</Fragment>

						<h1>Gold Coins</h1>
					</SwipeableViews>
				</div>
			</>
		);
	}
}

export default withStyles(styles,  { withTheme: true })(SaleWidget);
