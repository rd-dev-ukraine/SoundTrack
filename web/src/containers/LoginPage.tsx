import { connect, Dispatch } from "react-redux";
import { push } from "react-router-redux";

import { authLogin } from "../../../common/actions/auth";
import { LoginComponent } from "../../../common/components/Login";

const mapStateToProps = (state: AppState) => {
    return {
        loading: state.auth.loading,
        serverError: state.auth.error
    };
}

const mapDispatchToPros = (dispatch: Dispatch<AppState>) => {
    return {
        onSubmitLogin(creds: LoginCredentials) { dispatch(authLogin(creds)) },
        goToSignUp() { dispatch(push("/signUp")) }
    };
}

export const LoginPage = connect(mapStateToProps, mapDispatchToPros)(LoginComponent);