import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";

import { LoginPage } from "./containers/LoginPage";
import { browserHistory, store } from "./state/store";

import "./scss/index.scss";

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={browserHistory}>
            <div className="Route_wrapper">
                <Route exact path="/login" component={LoginPage} />
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById("root")
);