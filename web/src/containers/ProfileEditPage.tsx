import { connect, Dispatch } from "react-redux";

import { authUpdateProfile } from "../../../common/actions/auth";
import { ProfileEditComponent } from "../../../common/components/ProfileEdit";

const mapStateToProps = (state: AppState) => {
    return {
        loading: state.auth.loading,
        serverError: state.auth.error,
        profile: state.auth.profile
    };
}

const mapDispatchToPros = (dispatch: Dispatch<AppState>) => {
    return {
        onSubmitUpdate(form: UserBase) { dispatch(authUpdateProfile(form)) }
    };
}

export const ProfileEditPage = connect(mapStateToProps, mapDispatchToPros)(ProfileEditComponent);