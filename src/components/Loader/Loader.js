/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { any }  from "prop-types";
import * as ee from 'event-emitter';

import logo from "../../images/logo.png";

import componentClasses from "./Loader.less";

const EventEmitter = ee();


class LoaderContainer1 extends Component {
	static propTypes = {
		classes: any
	}

	state = {
		visible: false
	};

	onShow = () => {
		this.setState({ visible: true });
	};

	onHide = () => {
		this.setState({ visible: false });
	};

	componentWillMount() {
		EventEmitter.on('show', this.onShow);
		EventEmitter.on('hide', this.onHide);
	}

	componentWillUnmount() {
		EventEmitter.off('show', this.onShow);
		EventEmitter.off('hide', this.onHide);
	}

	render() {
		if (!this.state.visible) {
			return null;
		}
		return (
			<div className={componentClasses.loaderWrapper}>
				<img src={logo} />
			</div>
		);
	}
}


class Loader1 {
	static show() {
		if (EventEmitter) {
			EventEmitter.emit('show');
		}
	}

	static hide() {
		if (EventEmitter) {
			EventEmitter.emit('hide');
		}
	}
}

export const LoaderContainer = (LoaderContainer1);
export const loader = Loader1;
