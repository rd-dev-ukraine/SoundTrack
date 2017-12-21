import { combineReducers, createStore, applyMiddleware, compose, Store } from "redux";
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import { navReducer } from "../navigation/store";
import { authReducer } from "../../common/reducers/auth";

import { authSaga } from "./auth/saga";

const appReducer = combineReducers({
    nav: navReducer,
    auth: authReducer
});

const composeEnhancers = window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;
const sagaMiddleware = createSagaMiddleware();

export const store: Store<AppState> = createStore(
    appReducer,
    composeEnhancers(
        applyMiddleware(sagaMiddleware)
    )
);

sagaMiddleware.run(function* () {
    yield all([
        authSaga()
    ])
})
