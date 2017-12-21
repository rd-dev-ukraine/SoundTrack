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
                <View style={styles.wrapper}>
                    <View style={styles.center}>
                        <View style={styles.section}>
                            <Text style={styles.header}>Profile Info</Text>
                            <ProfileView profile={profile} />
                        </View>
                        <View style={styles.section}>
                            <View style={styles.button}>
                                <Button title="Edit Profile" onPress={onEditProfile} />
                            </View>
                            <View style={styles.button}>
                                <Button title="Change Password" onPress={onChangePassword} />
                            </View>
                            <View style={styles.button}>
                                <Button title="Log out" onPress={onLogOut} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            :
            null;
    }
}


const styles = StyleSheet.create({
    header: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 15,
        textAlign: "center"
    },
    wrapper: {
        flexDirection: "row",
        justifyContent: "center",
        flex: 1,
    },
    center: {
        flexDirection: "column",
        flex: 1,
        maxWidth: 400,
        alignItems: "stretch"
    },
    section: {
        marginBottom: 20
    },
    button: {
        marginBottom: 5
    }
});