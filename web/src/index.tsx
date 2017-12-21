import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";

import { LoginPage } from "./containers/LoginPage";
import { ProfilePage } from "./containers/ProfilePage";
import { ProfileEditPage } from "./containers/ProfileEditPage";
import { SignUpPage } from "./containers/SignUpPage";
import { ChangePasswordPage } from "./containers/ChangePasswordPage";

import { browserHistory, store } from "./state/store";
import { LoginRoute, ProfileEditRoute, ProfileRoute, SignUpRoute, PasswordChangeRoute } from "./common/routes";

import "./scss/index.scss";

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={browserHistory}>
            <div className="Route_wrapper">
                <Route exact path={LoginRoute} component={LoginPage} />
                <Route exact path={SignUpRoute} component={SignUpPage} />
                <Route exact path={ProfileRoute} component={ProfilePage} />
                <Route exact path={ProfileEditRoute} component={ProfileEditPage} />
                <Route exact path={PasswordChangeRoute} component={ChangePasswordPage} />
                {/* <Redirect exact path="/" to={ProfileRoute} /> */}
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById("root")
);