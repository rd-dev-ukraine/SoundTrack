import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware, routerReducer } from "react-router-redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";

import { authReducer } from "../../../common/reducers/auth";


const composeEnhancers = window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;
const sagaMiddleware = createSagaMiddleware();
export const browserHistory = createHistory();

export const store = createStore(
    combineReducers<AppState>({
        router: routerReducer,
        auth: authReducer
    }),
    composeEnhancers(
        applyMiddleware(
            sagaMiddleware,
            routerMiddleware(browserHistory),
        )
    )
);

sagaMiddleware.run(function* () {
    yield all([

    ]);
});