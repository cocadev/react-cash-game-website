import React, { Fragment } from 'react';
import { bool, func, object } from "prop-types";

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import PaypalExpressBtn from 'react-paypal-express-checkout';

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
	}

	state = {
		tabsValue: {
			index: 0,
			name: "Paypal"
		},
		validData: false,
		errorShow: false
	};

	mainTabChange = (value) => {
		this.setState({
			tabsValue: value
		});
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

	renderTabsContent = () => {
		const { classes, onClose } = this.props;

		const { tabsValue, errorShow } = this.state;

		switch (tabsValue.name) {
			case "Paypal":
				const client = {
					sandbox:    'YOUR-SANDBOX-APP-ID',
					production: 'YOUR-PRODUCTION-APP-ID',
				}

				return  <div className={classes.payPal}><PaypalExpressBtn client={client} currency={'USD'} total={1.00} /></div>;
			case "Credit Card":
				return (<Fragment>
					<DialogContent className={classes.content}>
						<CreditCard isAllValueValid={this.onValueValid} errorShow={errorShow}  />
					</DialogContent>
					<DialogActions >

						<div className={classes.buttonWrapper}>
							<Button onClick={onClose} color="primary">
								Cancel
							</Button>
							<Button onClick={this.onBuyBtnClick} color="primary">
								Buy
							</Button>
						</div>
					</DialogActions>
				</Fragment>);
			case "Gold Coins":
				return <h1>Gold Coins</h1>;
		}
	}

	render() {
		const { classes, open } = this.props;

		const { tabsValue } = this.state;

		const labels = [{ name: "Paypal" }, { name: "Credit Card" }, { name: "Gold Coins" }];

		return (
			<div>
				<Dialog
					onClose={this.props.onClose}
					classes={{ paper: classes.dialogMinSize }}
					open={open}
					scroll={"body"}
				>
					<Tabs
						value={tabsValue}
						mainTabChange={this.mainTabChange}
						labels={labels}
						fullWidth
					/>
					{ this.renderTabsContent() }
				</Dialog>
			</div>
		);
	}
}

export default withStyles(styles)(SaleWidget);
