import React, { Fragment } from 'react';
import { func, object } from "prop-types";

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';

import PaypalExpressBtn from 'react-paypal-express-checkout';
import SwipeableViews from 'react-swipeable-views';

import CreditCard from "../../components/CreditCard/CreditCard";
import Tabs from "../../components/Tabs/Tabs";
import customToastify from "../../helpers/customToastify";

import classes from "./SaleWidget.less";


class SaleWidget extends React.Component {
	static propTypes = {
		changeScrollTabHeight: func,
		onClose: func,
		theme: object
	}

	state = {
		value: 0,
		validData: false,
		errorShow: false
	};

	componentDidMount() {
		this.props.changeScrollTabHeight();
	}

	mainTabChange = (value) => {
		this.setState({
			tabsValue: value
		});
	};

	handleChange = (event, value) => {
		this.setState({ value });
		this.props.changeScrollTabHeight();
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
		const { theme } = this.props;

		const { value, errorShow } = this.state;

		const labels = [{ name: "Paypal" }, { name: "Credit Card" }, { name: "Gold Coins" }];

		const client = {
			sandbox: 'YOUR-SANDBOX-APP-ID',
			production: 'YOUR-PRODUCTION-APP-ID',
		};

		return (
			<div className={classes.saleWidget}>
				<Tabs
					className={classes.saleWidgetTab}
					value={value}
					fullWidth
					onChange={this.handleChange}
					labels={labels}
				/>
				<div className={classes.saleWidgetTabContentWrapper}>
					<SwipeableViews
						axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
						index={value}
						onChangeIndex={this.handleChangeIndex}
					>
						<div className={classes.saleWidgetPayPal}><PaypalExpressBtn client={client} currency={'USD'} total={1.00} /></div>
						<Fragment>
							<DialogContent className={classes.saleWidgetContent}>
								<div>
									<CreditCard isAllValueValid={this.onValueValid} errorShow={errorShow}  />

									<div className={classes.saleWidgetButtonWrapper}>
										<Button onClick={this.props.onClose} color="primary">
											Cancel
										</Button>
										<Button onClick={this.onBuyBtnClick} color="primary">
											Buy
										</Button>
									</div>
								</div>
							</DialogContent>
						</Fragment>

						<h1>Gold Coins</h1>
					</SwipeableViews>
				</div>
			</div>
		);
	}
}

export default withStyles(null,  { withTheme: true })(SaleWidget);
