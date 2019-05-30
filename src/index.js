import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from "react-redux";
import { Router } from "react-router-dom";

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import store from "./modules/store";

import history from "./modules/history";

import App from './App';


const theme = createMuiTheme({
	typography: {
		useNextVariants: true,
	},
	palette: {
		primary: {
			main: "#442c2e",
			light: '#FEDBD0',
			dark: '#FEDBD0',
		},
		secondary: {
			light: '#FEDBD0',
			main: '#FEDBD0',
			dark: '#FEDBD0',
			contrastText: '#FEDBD0',
		},
	}
});


ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider theme={theme}>
			<Router history={history}>
				<App />
			</Router>
		</MuiThemeProvider>
	</Provider>
	, document.getElementById('root'));
