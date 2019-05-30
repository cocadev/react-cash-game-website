import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from "react-redux";
import { Router } from "react-router-dom";

import store from "./modules/store";

import history from "./config/history";

import App from './App';


ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<App />
		</Router>
	</Provider>
	, document.getElementById('root'));
