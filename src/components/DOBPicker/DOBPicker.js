import React from 'react';
import { func, object } from "prop-types";

import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
	selectorWrapper: {
		display: "flex",
		margin: "0 -5px"
	},
	selectorContainer: {
		margin: "0 25px 0",
		flexGrow: "1",
		flexShrink: "0"
	},
	selector: {
		webkitAppearance: "none",
		mozAppearance: "none",
		appearance: "none",
		background: "#ffffff",
		borderRadius: "3px",
		border: "1px solid #e6e6e6",
		color: "#666666",
		display: "block",
		float: "left",
		fontSize: "1.125rem",
		height: "3.125rem",
		margin: "0",
		padding: "0 1.25rem",
		position: "relative",
		width: "100%",
	},
	mainSelector: {
		outline: "none",
		backgroundColor: "#ffff",
		fontSize: "1rem",
		lineHeight: "1.25rem",
		border: "0 !important",
		boxSizing: "borderBox",
		color: "#666666",
		fontFamily: "-apple-system, BlinkMacSystemFont, Roboto, Oxygen-Sans, Ubuntu, Cantarell, sans-serif",
		height: "100%",
		margin: "0",
		padding: "0.625rem calc(2.875rem + 0.625rem) 0.625rem 0.625rem",
		width: "100%",
	}
});


class DOBPicker extends React.Component {
	static propTypes = {
		classes: object,
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
		const { classes } = this.props;

		const months = [
			"January", "February", "March", "April",
			"May", "June", "July", "August", "September",
			"October", "November", "December"
		];

		return (
			<form>
				<p>Date of birth</p>
				<div className={classes.selectorWrapper}>
					<div className={classes.selectorContainer}>
						<div className={classes.selector}>
							<select  className={classes.mainSelector}  onChange={this.selectOnChange} name="day" tabIndex="1">
								<option value="">Day</option>
								{ this.renderByRange(1, 31) }
							</select>
						</div>
					</div>

					<div className={classes.selectorContainer}>
						<div className={classes.selector}>
							<select  className={classes.mainSelector}  onChange={this.selectOnChange} name="month" tabIndex="1">
								<option value="">Month</option>
								{
									months.map((month, index) => {
										return <option key={month} value={index}>{month}</option>;
									})
								}
							</select>
						</div>
					</div>

					<div className={classes.selectorContainer}>
						<div className={classes.selector}>
							<select className={classes.mainSelector} onChange={this.selectOnChange} name="year" tabIndex="1">
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

export default withStyles(styles)(DOBPicker);
