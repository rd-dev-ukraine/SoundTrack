import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import * as React from "react";
import { connect } from "react-redux";

import { } from '../../common/components';
import { ChangePasswordScreen, LoginScreen, SignUpScreen, ProfileEditScreen } from '../containers';

import { MainNavComponent } from './MainNavigation';

export const AppNavigator = StackNavigator(
    {
        Main: {
            screen: MainNavComponent,
            navigationOptions: () => ({
                header: null,
                headerTitle: "Cancel"
            }),
        },
        Login: {
            screen: LoginScreen,
            navigationOptions: () => ({
                header: null,
                headerTitle: "Login"
            }),
        },
        SignUp: {
            screen: SignUpScreen,
            navigationOptions: () => ({
                headerTitle: "Register",
            }),
        },
        ProfileEdit: {
            screen: ProfileEditScreen,
            navigationOptions: () => ({
                headerTitle: "Edit Profile",
                headerBackTitle: "Cancel"
            }),
        },
        ChangePassword: {
            screen: ChangePasswordScreen,
            navigationOptions: () => ({
                headerTitle: "Change Password",
                headerBackTitle: "Cancel"
            }),
        },
    }
);

interface AppNavComponentrProps {
    dispatch: any;
    nav: any;
}

export class AppNavComponent extends React.Component<AppNavComponentrProps, {}> {
    render() {
        return (
            <AppNavigator navigation={addNavigationHelpers({
                dispatch: this.props.dispatch,
                state: this.props.nav,
            })} />
        );
    }
}

const mapStateToProps = (state) => ({
    nav: state.nav
});

export const AppNav = connect(mapStateToProps)(AppNavComponent);