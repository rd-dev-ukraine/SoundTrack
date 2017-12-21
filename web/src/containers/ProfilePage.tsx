import { connect, Dispatch } from "react-redux";
import { push } from "react-router-redux";

import { authLogOut } from "../../../common/actions/auth";
import { ProfileComponent } from "../../../common/components/Profile";
import { ProfileEditRoute, PasswordChangeRoute } from "../common/routes";


const mapStateToProps = (state: AppState) => {
    return {
        profile: state.auth.profile
    };
}

const mapDispatchToProps = (dispatch: Dispatch<AppState>) => {
    return {
        onLogOut() { dispatch(authLogOut()) },
        onEditProfile() { dispatch(push(ProfileEditRoute)) },
        onChangePassword() { dispatch(push(PasswordChangeRoute)) }
    };
}

export const ProfilePage = connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);