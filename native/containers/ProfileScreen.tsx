import { connect, Dispatch } from "react-redux";
import { NavigationActions } from "react-navigation";

import { authLogOut } from "../../common/actions/auth";
import { ProfileComponent } from "../../common/components";

const mapStateToProps = (state: AppState) => {
    return {
        profile: state.auth.profile
    };
}

const mapDispatchToProps = (dispatch: Dispatch<AppState>) => {
    return {
        onLogOut() { dispatch(authLogOut()) },
        onEditProfile() { dispatch(NavigationActions.navigate({ routeName: "ProfileEdit" })) },
        onChangePassword() { dispatch(NavigationActions.navigate({ routeName: "ChangePassword" })) }
    };
}

export const ProfileScreen = connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);