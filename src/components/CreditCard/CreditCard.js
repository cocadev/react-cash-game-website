import React, { Fragment } from 'react';
import { object, func, bool } from "prop-types";

import { withStyles } from '@material-ui/core/styles';

import Payment from 'payment';
import Cards from 'react-credit-cards';

import TextField from '@material-ui/core/TextField';

import 'react-credit-cards/es/styles-compiled.css';

const styles = () => ({
	root: {
		marginTop: "30px"
	},
	textField: {
		margin: "0 5px"
	}
});


class CreditCard extends React.Component {
	static propTypes = {
		classes: object,
		errorShow: bool,
		isAllValueValid: func
	}

	state = {
		number: '',
		name: '',
		expiry: '',
		cvc: '',
		focused: '',
		type: '',
		isValidName: bool,
	};

	componentDidMount() {
		Payment.formatCardNumber(document.querySelector('[name="number"]'));
		Payment.formatCardExpiry(document.querySelector('[name="expiry"]'));
		Payment.formatCardCVC(document.querySelector('[name="cvc"]'));
	}

	handleInputFocus = ({ target }) => {
		this.setState({
			focused: target.name,
		});
	};

	checkValidData = () => {
		if (this.state.expiry !== "" && this.state.cvc !== "" && this.state.number.length >= 16) {
			this.props.isAllValueValid(true);
		} else {
			this.props.isAllValueValid(false);
		}
	}

	handleInputChange = ({ target }) => {
		if (target.name === 'number') {
			this.setState({
				[target.name]: target.value.replace(/ /g, ''),
			}, this.checkValidData());
		} else if (target.name === 'expiry') {
			this.setState({
				[target.name]: target.value.replace(/ |\//g, ''),
			}, this.checkValidData());
		} else {
			this.setState({
				[target.name]: target.value,
			}, this.checkValidData());
		}
	};

	handleCallback = (type, isValid) => {
		if (isValid === true) {
			this.setState({
				isValidName: true
			});
		} else {
			this.setState({
				isValidName: false
			});
		}
	}

	render() {
		const { classes, errorShow } = this.props;

		const { name, number, expiry, cvc, focused } = this.state;

		return (
			<div className={classes.root}>
				<Cards
					number={number}
					name={name}
					expiry={expiry}
					cvc={cvc}
					focused={focused}
					callback={this.handleCallback}
				/>
				<form className={classes.root}>
					<div>
						<TextField
							error={errorShow}
							className={classes.textField}
							label="Card Number"
							type="tel"
							name="number"
							placeholder="Card Number"
							onKeyUp={this.handleInputChange}
							onFocus={this.handleInputFocus}
						/>
						<TextField
							error={errorShow}
							className={classes.textField}
							label="Name"
							type="text"
							name="name"
							placeholder="Name"
							onKeyUp={this.handleInputChange}
							onFocus={this.handleInputFocus}
						/>
					</div>
					<div>
						<TextField
							error={errorShow}
							className={classes.textField}
							label="Expiry Date"
							type="tel"
							name="expiry"
							placeholder="Expiry Date"
							onKeyUp={this.handleInputChange}
							onFocus={this.handleInputFocus}
						/>
						<TextField
							error={errorShow}
							className={classes.textField}
							label="CVC"
							type="tel"
							name="cvc"
							placeholder="CVC"
							onKeyUp={this.handleInputChange}
							onFocus={this.handleInputFocus}
						/>
					</div>
				</form>
			</div>
		);
	}
}

export default withStyles(styles)(CreditCard);

