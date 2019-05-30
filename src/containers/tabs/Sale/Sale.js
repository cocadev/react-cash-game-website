import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { object, array } from "prop-types";

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import * as saleActions from "../../../modules/sale/sale.actions";

import SaleWidget from "../../../components/SaleWidget/SaleWidget";
import withAnimation from "../../../hoc/animation";

const styles = () => ({
	root: {
		width: '100%',
		textAlign: "center",
		cursor: "pointer"
	},
	mainWrapperContent: {
		backgroundColor: "#ffffff",
		margin: "20px 0 0 0",
		width: "100%",
		minHeight: "calc(100vh - 112px)",
		animation: "unset"
	}
});

class Sale extends React.Component {
	static propTypes = {
		classes: object,
		offers: array
	}

	constructor(props) {
		super(props);
		this.onLoadAnimation = React.createRef();
	}


	state = {
		modalVisibility: false,
	}

	componentDidMount(){
		const dots = [
			{ y: 100, width: 10, x: 0 },
			{ y: 80, width: 100, x: 0},
			{ y: 0, width: 100, x: 0 }
		];

		const time = 600;

		const update = ({ y, width, x}) => {
			this.onLoadAnimation.current.style.transform = `translateY(${y}%) translateX(${x}%)`;
			this.onLoadAnimation.current.style.width = `${width}%`;
		};

		this.props.setAnimationElement(this.onLoadAnimation, dots, time, update);
	}

	handleModalClose = () => {
		this.setState({ modalVisibility: false });
	};

	handleModalOpen = () => {
		this.setState({ modalVisibility: true });
	}

	render() {
		const { classes, offers } = this.props;

		const { modalVisibility } = this.state;

		return (
			<Fragment>
				<div ref={this.onLoadAnimation} hidden className={classes.mainWrapperContent}>
					<Grid
						direction="row"
						container
						item
						lg={12} xs={10}
						spacing={24}
					>
						{
							offers.map((offer, index) => {
								const { name, description, price } = offer;

								return (
									<Grid key={index} lg={2} item xs={12}>
										<Paper onClick={this.handleModalOpen} className={classes.root} elevation={1}>
											<h3>{ name }</h3>
											<p>{ description }</p>
											<p>{ price }</p>
										</Paper>
									</Grid>
								);
							})
						}
					</Grid>

				</div>

				<SaleWidget open={modalVisibility} onClose={this.handleModalClose} />
			</Fragment>
		);
	}
}

export default withAnimation(connect(null, { ...saleActions })((withStyles(styles,  { withTheme: true })(Sale))));

