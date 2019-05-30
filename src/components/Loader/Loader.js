/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { any }  from "prop-types";
import * as ee from 'event-emitter';

import componentClasses from "./Loader.less";
class LoaderContainer1 extends Component {
	static propTypes = {
		classes: any
	}

	state = {
		visible: false
	};

	componentWillMount() {
		if (!window.LoaderEmitter) {
			window.LoaderEmitter = ee();
		}
		window.LoaderEmitter.on('show', this.onShow);
		window.LoaderEmitter.on('hide', this.onHide);
	}

	componentWillUnmount() {
		window.LoaderEmitter.off('show', this.onShow);
		window.LoaderEmitter.off('hide', this.onHide);
	}

	onShow = () => {
		this.setState({ visible: true });
	};

	onHide = () => {
		this.setState({ visible: false });
	};

	render() {
		if (!this.state.visible) {
			return null;
		}
		return (
			<div className={componentClasses.rootLoader}>
				<div className={componentClasses.ldsRoller}><div /><div /><div /><div /><div /><div /><div /><div /></div>
			</div>
		);
	}
}

class Loader1 {
	static getEmitter() {
		if (!window.LoaderEmitter) {
			return null;
		}

		return window.LoaderEmitter;
	}

	static show() {
		const em = Loader1.getEmitter();
		if (em) {
			em.emit('show');
		}
	}

	static hide() {
		const em = Loader1.getEmitter();
		if (em) {
			em.emit('hide');
		}
	}
}

export const LoaderContainer = (LoaderContainer1);
export const loader = Loader1;
