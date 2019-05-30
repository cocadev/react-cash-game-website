import React from 'react';
import { func, bool } from "prop-types";

import Payment from 'payment';
import Cards from 'react-credit-cards';

import TextField from '@material-ui/core/TextField';

import 'react-credit-cards/es/styles-compiled.css';
import classes from "./CreditCard.less";


class CreditCard extends React.Component {
	static propTypes = {
		errorShow: bool,
		isAllValueValid: func
	}

	constructor(props) {
		super(props);
		this.nameOfCard = React.createRef();
		this.number = React.createRef();
		this.expiry = React.createRef();
		this.cvc = React.createRef();
		this.postalCode = React.createRef();
	}

	state = {
		number: '',
		name: '',
		expiry: '',
		cvc: '',
		focused: '',
		type: '',
		postalCode: '',
		isValidName: true,
		numberError: true,
		nameError: true,
		expiryError: true,
		cvcError: true,
		postalCodeError: true
	};

	componentDidMount() {
		Payment.formatCardNumber(this.number.current);
		Payment.formatCardExpiry(this.expiry.current);
		Payment.formatCardCVC(this.cvc.current);
		Payment.restrictNumeric(this.postalCode.current);
	}

	handleInputFocus = ({ target }) => {
		this.setState({
			focused: target.name,
		});
	};

	checkValidData = () => {
		this.setState({
			cvcError: !Payment.fns.validateCardCVC(this.cvc.current.value),
			expiryError: !Payment.fns.validateCardExpiry(this.expiry.current.value),
			numberError: !Payment.fns.validateCardNumber(this.number.current.value),
			postalCodeError: this.postalCode.current.value === "",
			nameError: this.nameOfCard.current.value === ""
		});

		if (Payment.fns.validateCardCVC(this.cvc.current.value) &&
			Payment.fns.validateCardExpiry(this.expiry.current.value) &&
			Payment.fns.validateCardNumber(this.number.current.value) &&
			this.postalCode.current.value !== "") {
			this.props.isAllValueValid(true);
		} else {
			this.props.isAllValueValid(false);
		}
	}

	handleInputChange = ({ target }) => {
		this.checkValidData();

		if (target.name === 'number') {
			this.setState({
				[target.name]: target.value.replace(/ /g, ''),
			});
		} else if (target.name === 'expiry') {
			this.setState({
				[target.name]: target.value.replace(/ |\//g, ''),
			});
		} else if (target.name === 'postalCode') {
			this.setState({
				[target.name]: target.value.replace(/ /g, ''),
			});
		} else {
			this.setState({
				[target.name]: target.value,
			});
		}
	};

	render() {
		const { errorShow } = this.props;

		const { name, number, expiry, cvc, focused, numberError, expiryError, cvcError, postalCodeError, nameError } = this.state;

		return (
			<div className={classes.creditCard}>
				<Cards
					number={number}
					name={name}
					expiry={expiry}
					cvc={cvc}
					focused={focused}
				/>
				<form className={classes.creditCardRoot}>
					<TextField
						inputRef={this.nameOfCard}
						fullWidth
						error={errorShow && nameError}
						label="Name on card"
						type="text"
						name="name"
						placeholder="Name on card"
						onKeyUp={this.handleInputChange}
						onFocus={this.handleInputFocus}
					/>
					<TextField
						fullWidth
						inputRef={this.number}
						error={errorShow && numberError}
						label="Card number"
						type="tel"
						name="number"
						placeholder="Card number"
						onKeyUp={this.handleInputChange}
						onFocus={this.handleInputFocus}
					/>
					<div className={classes.creditCardTextFieldWrapper}>
						<TextField
							inputRef={this.expiry}
							error={errorShow && expiryError}
							className={classes.creditCardTextField}
							label="Expiry Date"
							type="tel"
							name="expiry"
							placeholder="Expiry Date"
							onKeyUp={this.handleInputChange}
							onFocus={this.handleInputFocus}
						/>
						<TextField
							inputRef={this.cvc}
							error={errorShow && cvcError}
							className={classes.creditCardTextField}
							label="CVC"
							type="tel"
							name="cvc"
							placeholder="CVC"
							onKeyUp={this.handleInputChange}
							onFocus={this.handleInputFocus}
						/>
					</div>
					<TextField
						inputRef={this.postalCode}
						fullWidth
						error={errorShow && postalCodeError}
						label="Postal Code"
						type="tel"
						name="postalCode"
						placeholder="Postal Code"
						onKeyUp={this.handleInputChange}
						onFocus={this.handleInputFocus}
					/>
				</form>
			</div>
		);
	}
}

export default CreditCard;

