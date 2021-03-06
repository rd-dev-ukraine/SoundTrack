import { connect, Dispatch } from "react-redux";

import { authSignUp } from "../../../common/actions/auth";
import { SignUpComponent } from "../../../common/components/SignUp";


const mapStateToProps = (state: AppState) => {
    return {
        loading: state.auth.loading,
        serverError: state.auth.error
    };
}

const mapDispatchToPros = (dispatch: Dispatch<AppState>) => {
    return {
        onSubmitLogin(form: UserForm) { dispatch(authSignUp(form)) }
    };
}

export const SignUpPage = connect(mapStateToProps, mapDispatchToPros)(SignUpComponent);