import { connect, Dispatch } from "react-redux";
import { NavigationActions } from "react-navigation";

import { authLogin } from "../../common/actions/auth";
import { LoginComponent } from "../../common/components";

const mapStateToProps = (state: AppState) => {
    return {
        loading: state.auth.loading,
        serverError: state.auth.error
    };
}

const mapDispatchToPros = (dispatch: Dispatch<AppState>) => {
    return {
        onSubmitLogin(creds: LoginCredentials) { dispatch(authLogin(creds)) },
        goToSignUp() { dispatch(NavigationActions.navigate({ routeName: "SignUp" })) }
    };
}

export const LoginScreen = connect(mapStateToProps, mapDispatchToPros)(LoginComponent);