import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Odometer from 'odometer';

export default class ReactOdometer extends PureComponent {
	static propTypes = {
		animation: PropTypes.bool,
		auto: PropTypes.bool,
		classes: PropTypes.object,
		duration: PropTypes.number,
		format: PropTypes.string,
		selector: PropTypes.string,
		theme: PropTypes.string,
		value: PropTypes.number.isRequired
	};

	state = {
		value: 0.0001
	}

	constructor(props) {
		super(props);

		this.node = React.createRef();
	}

	componentDidMount() {
		const { value, ...options } = this.props;

		const stateValue = this.state.value;

		this.odometer = new Odometer({
			el: this.node.current,
			stateValue,
			...options,
		});

		this.odometer.update(value);
	}

	componentDidUpdate() {
		const { value } = this.props;

		this.odometer.update(value);
	}

	render() {
		return (
			<div className={this.props.classes} ref={this.node} />
		);
	}
}
