import createSagaMiddleware from 'redux-saga';
import { compose, createStore, combineReducers, applyMiddleware } from "redux";

import auth from "./auth/auth.reducer";
import friend from "./friend/friend.reducer";
import sale from "./sale/sale.reducer";
import winners from "./winners/winners.reducer";
import menus from "./menus/menus.reducer";

import { initializeSaga } from "./auth/auth.actions";
import { watchFetchUser } from "./auth/auth.saga";
import { watchFetchFriend } from "./friend/friend.saga";
import { watchFetchSale } from "./sale/sale.saga";
import { watchFetchWinners } from "./winners/winners.saga";


const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({ auth, friend, sale, winners, menus });

const store = createStore(rootReducer, undefined, compose(
	applyMiddleware(sagaMiddleware),
	window.devToolsExtension ? window.devToolsExtension() : (f) => f
));

sagaMiddleware.run(watchFetchUser);
sagaMiddleware.run(watchFetchFriend);
sagaMiddleware.run(watchFetchSale);
sagaMiddleware.run(watchFetchWinners);

store.dispatch(initializeSaga());


export default store;
