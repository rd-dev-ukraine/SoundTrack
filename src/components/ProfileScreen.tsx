import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { View, Text, StyleSheet, Button } from "react-native";
import { NavigationActions } from "react-navigation";

import { authLogOut } from "../store";

import { ProfileView } from "./profile/ProfileView";
import { styles as screnStyles } from "./styles/screen";

interface ProfileScreenComponentProps {
    profile: User;

    onLogOut: () => any;
    onEditProfile: () => any;
    onChangePassword: () => any;
}

interface ProfileScreenComponentState {
    isEditing: boolean;
}

class ProfileScreenComponent extends React.Component<ProfileScreenComponentProps, ProfileScreenComponentState> {
    constructor(props) {
        super(props);
    }

    render() {
        const { profile, onLogOut, onEditProfile, onChangePassword } = this.props;
        return profile ?
            <View style={screnStyles.screenContainer}>
                <View style={styles.section}>
                    <Text style={styles.header}>Profile Info</Text>
                    <ProfileView profile={profile} />
                </View>
                {/* <View style={styles.section}>
                    <View style={styles.row}>
                        <View style={styles.rowHalf}>
                            <Button title="Edit Profile" onPress={onEditProfile} />
                        </View>
                        <View style={styles.rowHalf}>
                            <Button title="Change Password" onPress={onChangePassword} />
                        </View>
                    </View>
                </View> */}
                <Button title="Edit Profile" onPress={onEditProfile} />
                <Button title="Change Password" onPress={onChangePassword} />
                <Button title="Log out" onPress={onLogOut} />
            </View>
            :
            null;
    }
}

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

export const ProfileScreen = connect(mapStateToProps, mapDispatchToProps)(ProfileScreenComponent);

const styles = StyleSheet.create({
    header: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 15
    },
    section: {
        alignItems: "center",
        marginBottom: 20
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    rowHalf: {
        flex: 1
    }
});