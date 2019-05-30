import React, { Fragment } from 'react';
import { bool, func, object } from "prop-types";

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Checkbox from '@material-ui/core/Checkbox';

import DOBPicker from "../../components/DOBPicker/DOBPicker";

function diff_years(dt2, dt1) {
	let diff = (dt2.getTime() - dt1) / 1000;
	diff /= (60 * 60 * 24);
	return Math.abs(Math.round(diff / 365.25));
}


const styles = () => ({
	dialogAction: {
		display: "block",
		paddingLeft: "10px"
	},
	errorLabel: {
		margin: "10px 0",
		color: "#F54B55"
	},
	dataPicker: {
		display: 'flex',
		width: "100%",
		alignItems: "flex-end"
	},
	dataPickerWrapper: {
		display: "flex",
		flexDirection: "column"
	},
	buttonWrapper: {
		display: 'flex',
		justifyContent: 'flex-end'
	}
});


class ScrollDialog extends React.Component {
	static propTypes = {
		classes: object,
		handleClose: func,
		handleConfirmAge: func,
		open: bool
	}

	state = {
		confirmChecked: false,
		data: "",
		datePickerVerify: false,
		dataPrickerErrorShow: false
	}

	handleChange = () => {
		this.setState({ confirmChecked: !this.state.confirmChecked });
	}

	onDataPickerChange = (data) => {
		if (data) {
			let pickedData = data;

			if (diff_years(pickedData, Date.now()) >= 18) {
				pickedData = `${pickedData.getDate()}/${pickedData.getMonth() + 1}/${pickedData.getFullYear()}`;

				this.setState({
					datePickerVerify: pickedData
				});
			}
		}
	}

	onSubmitBtnClick = () => {
		if (!this.state.datePickerVerify) {
			this.setState({
				dataPrickerErrorShow: true
			});
		} else {
			this.props.handleConfirmAge(this.state.datePickerVerify);
		}
	}

	renderDataPicker = () => {
		const { classes } = this.props;

		return (
			<Fragment>
				<div className={classes.flexDirection}>
					<DOBPicker onDataPickerChange={this.onDataPickerChange}  />

					{ this.state.dataPrickerErrorShow &&
						<p className={classes.errorLabel}> You have to be at least 18 years old </p>
					}
				</div>
			</Fragment>
		);
	}

	render() {
		const { open, handleClose, classes } = this.props;

		const { confirmChecked } = this.state;

		return (
			<div>
				<Dialog
					open={open}
					onClose={handleClose}
					scroll="paper"
					aria-labelledby="scroll-dialog-title"
				>
					<DialogTitle id="scroll-dialog-title">Agreement</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab accusantium aut corporis eaque eius enim
							error eveniet excepturi expedita fuga hic illum inventore, iusto labore laboriosam libero maxime
							molestias natus nemo officiis omnis perspiciatis provident quae, quas quibusdam quis recusandae
							reprehenderit saepe similique sit soluta totam ullam vel velit vitae voluptas! Accusantium dicta
							est facere, ipsam libero magnam nam qui saepe totam unde! Adipisci, consectetur consequuntur delectus
							deleniti dicta dignissimos doloremque excepturi facilis fuga hic, ipsa iste laudantium minima nesciunt
							nulla optio repellat soluta voluptates. Beatae deserunt esse in iure libero mollitia quam quibusdam? Aliquam
							culpa cum deleniti dolorum eius, eveniet facere, in laudantium obcaecati omnis quas reprehenderit velit
							voluptatum. At culpa dolores ducimus, est eveniet facere in magni molestiae molestias, nesciunt obcaecati
							pariatur porro, quaerat quidem quod repudiandae sequi velit. Aliquam blanditiis consectetur
							delectus dignissimos iste nemo provident quas sunt. Accusamus accusantium amet cum dolor eius ipsa quasi
							saepe tempora? Labore magnam optio repellendus sed! Aperiam assumenda commodi dolore dolorum incidunt iure
							laudantium, magni minima minus neque nesciunt, pariatur possimus sed sint voluptas voluptate voluptatum.
							Animi dolores eaque eius fuga fugiat ipsa labore libero optio tempore unde. Alias asperiores consequuntur
							cum maxime minima omnis praesentium reprehenderit veritatis voluptatum.
							amus accusantium amet cum dolor eius ipsa quasi
							saepe tempora? Labore magnam optio repellendus sed! Aperiam assumenda commodi dolore dolorum incidunt iure
							laudantium, magni minima minus neque nesciunt, pariatur possimus sed sint voluptas voluptate voluptatum.
							Animi dolores eaque eius fuga fugiat ipsa labore libero optio tempore unde. Alias asperiores consequuntur
							cum maxime minima omnis praesentium reprehenderit veritatis voluptatum.
							a dolores ducimus, est eveniet facere in magni molestiae molestias, nesciunt obcaecati
							pariatur porro, quaerat quidem quod repudiandae sequi velit. Aliquam blanditiis consectetur
							delectus dignissimos iste nemo provident quas sunt. Accusamus accusantium amet cum dolor eius ipsa quasi
							saepe tempora? Labore magnam optio repellendus sed! Aperiam assumenda commodi dolore dolorum incidunt iure
							laudantium, magni minima minus neque nesciunt, pariatur possimus sed sint voluptas voluptate voluptatum.
							Animi dolores eaque eius fuga fugiat ipsa labore libero optio tempore unde. Alias asperiores consequuntur
							cum maxime minima omnis praesentium reprehenderit veritatis voluptatum.
							amus accusantium amet cum dolor eius ipsa quasi
							saepe tempora? Labore magnam optio repellendus sed! Aperiam assumenda commodi dolore dolorum incidunt iure
							laudantium, magni minima minus neque nesciunt, pariatur possimus sed sint voluptas voluptate voluptatum.
							Animi dolores eaque eius fuga fugiat ipsa labore libero optio tempore unde. Alias asperiores consequuntur
							cum maxime minima omnis praesentium reprehenderit veritatis voluptatum.
						</DialogContentText>
					</DialogContent>
					<DialogActions className={classes.dialogAction}>
						<div className={classes.dataPicker}>
							{ this.renderDataPicker() }

						</div>

						<div>
							<p> Confirm rules
								<Checkbox
									checked={confirmChecked}
									onChange={this.handleChange}
									color={"primary"}
								/>
							</p>
							<div className={classes.buttonWrapper}>
								<Button onClick={handleClose} color="primary">
										Cancel
								</Button>
								<Button disabled={!confirmChecked} onClick={this.onSubmitBtnClick} color="primary">
									Agree
								</Button>
							</div>
						</div>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default withStyles(styles)(ScrollDialog);
