import createSagaMiddleware from 'redux-saga';
import { compose, createStore, combineReducers, applyMiddleware } from "redux";

import auth from "./auth/auth.reducer";
import friend from "./friend/friend.reducer";

import { initializeSaga } from "./auth/auth.actions";
import { watchFetchUser } from "./auth/auth.saga";
import { watchFetchFriend } from "./friend/friend.saga";


const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({ auth, friend });

const store = createStore(rootReducer, undefined, compose(
	applyMiddleware(sagaMiddleware),
	window.devToolsExtension ? window.devToolsExtension() : (f) => f
));

sagaMiddleware.run(watchFetchUser);
sagaMiddleware.run(watchFetchFriend);

store.dispatch(initializeSaga());


export default store;
