import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { object, array, func } from "prop-types";

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import * as saleActions from "../../../modules/sale/sale.actions";

import SaleWidget from "../../../components/SaleWidget/SaleWidget";

import Free from "../../../containers/tabs/Free/Free";

const styles = () => ({
	root: {
		width: '100%',
		textAlign: "center",
		cursor: "pointer"
	},
	mainWrapperContent: {
		margin: "20px 0 0 0",
		width: "100%",
		minHeight: "calc(100vh - 112px)",
		animation: "unset"
	}
});

class Sale extends React.Component {
	static propTypes = {
		classes: object,
		offers: array,
		onVideoPlay: func
	}

	constructor(props) {
		super(props);
		this.onLoadAnimation = React.createRef();
	}


	state = {
		modalVisibility: false,
	}

	componentDidMount(){
		// const dots = [
		// 	{ y: 100, width: 10, x: 0, element: this.onLoadAnimation.current },
		// 	{ y: 80, width: 100, x: 0, element: this.onLoadAnimation.current },
		// 	{ y: 0, width: 100, x: 0, element: this.onLoadAnimation.current }
		// ];
		//
		// const time = 600;
		//
		// const update = ({ y, width, x, element }) => {
		// 	element.style.transform = `translateY(${y}%) translateX(${x}%)`;
		// 	element.style.width = `${width}%`;
		// };
		//
		// customTween(dots, time, update, this.onLoadAnimation.current);
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

		const saleProduct = [];
		const freeProduct = [];

		offers.map((offer) => {
			offer.price === 0 ? freeProduct.push(offer) : saleProduct.push(offer);
		});

		return (
			<Fragment>
				<div className={classes.mainWrapperContent}>
					<Grid
						direction="row"
						container
						item
						lg={12} xs={10}
						spacing={24}
					>
						{
							saleProduct.map((offer, index) => {
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

					<h1>Free</h1>
					<Free onVideoPlay={this.props.onVideoPlay} offers={freeProduct} />

				</div>

				<SaleWidget open={modalVisibility} onClose={this.handleModalClose} />

			</Fragment>
		);
	}
}

export default connect(null, { ...saleActions })((withStyles(styles,  { withTheme: true })(Sale)));

