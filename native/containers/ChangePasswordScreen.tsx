import { connect, Dispatch } from "react-redux";

import { authChangePassword } from "../../common/actions/auth";
import { ChangePasswordComponent } from "../../common/components";

const mapStateToProps = (state: AppState) => {
    return {
        loading: state.auth.loading,
        serverError: state.auth.error
    };
}

const mapDispatchToPros = (dispatch: Dispatch<AppState>) => {
    return {
        onSubmitChangePassword(form: PasswordForm) { dispatch(authChangePassword(form)) },
    };
}

export const ChangePasswordScreen = connect(mapStateToProps, mapDispatchToPros)(ChangePasswordComponent);