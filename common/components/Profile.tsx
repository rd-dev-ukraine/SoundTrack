import * as React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import { ProfileView } from "./profile/ProfileView";
import { styles as screnStyles } from "./styles/screen";

interface ProfileComponentProps {
    profile: User;

    onLogOut: () => any;
    onEditProfile: () => any;
    onChangePassword: () => any;
}

interface ProfileComponentState {
    isEditing: boolean;
}

export class ProfileComponent extends React.Component<ProfileComponentProps, ProfileComponentState> {
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
                <Button title="Edit Profile" onPress={onEditProfile} />
                <Button title="Change Password" onPress={onChangePassword} />
                <Button title="Log out" onPress={onLogOut} />
            </View>
            :
            null;
    }
}


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