import React from 'react';
import { func } from "prop-types";

import classes from "./DOBPicker.less";


class DOBPicker extends React.Component {
	static propTypes = {
		onDataPickerChange: func
	}

	state = {
		day: "",
		month: "",
		year: "",
	}

	renderByRange = (start, end, order = false) => {
		const rows = [];
		if (!order) {
			for (let i = start; i <= end; i++) {
				rows.push(<option key={i} value={i}>{i}</option>);
			}
		} else {
			for (let i = start; i >= end; i--) {
				rows.push(<option key={i} value={i}>{i}</option>);
			}
		}

		return rows;
	}

	selectOnChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		}, () => {
			if (this.state.day !== "" && this.state.month !== "" && this.state.year !== "") {
				const dataString = `${this.state.year}-${parseInt(this.state.month) + 1}-${this.state.day}`;
				const data = new Date(dataString);

				this.props.onDataPickerChange(data);
			} else {
				this.props.onDataPickerChange(false);
			}
		});
	}

	render() {

		const months = [
			"January", "February", "March", "April",
			"May", "June", "July", "August", "September",
			"October", "November", "December"
		];

		return (
			<form className={classes.dobPicker}>
				<p>Date of birth</p>
				<div className={classes.dobPickerSelectorWrapper}>
					<div className={classes.dobPickerSelectorContainer}>
						<div className={classes.dobPickerSelector}>
							<select  className={classes.dobPickerMainSelector}  onChange={this.selectOnChange} name="day" tabIndex="1">
								<option value="">Day</option>
								{ this.renderByRange(1, 31) }
							</select>
						</div>
					</div>

					<div className={classes.dobPickerSelectorContainer}>
						<div className={classes.dobPickerSelector}>
							<select  className={classes.dobPickerMainSelector}  onChange={this.selectOnChange} name="month" tabIndex="1">
								<option value="">Month</option>
								{
									months.map((month, index) => {
										return <option key={month} value={index}>{month}</option>;
									})
								}
							</select>
						</div>
					</div>

					<div className={classes.dobPickerSelectorContainer}>
						<div className={classes.dobPickerSelector}>
							<select className={classes.dobPickerMainSelector} onChange={this.selectOnChange} name="year" tabIndex="1">
								<option value="">Year</option>
								{ this.renderByRange(2018, 1900, true) }
							</select>
						</div>
					</div>
				</div>
			</form>
		);
	}
}

export default DOBPicker;
